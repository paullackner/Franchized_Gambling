use std::vec;

use futures::{future::TryFutureExt, stream::TryStreamExt};
use rand::prelude::*;
use rocket::serde::Serialize;
use rocket::{form::Form, futures, post, serde::json::Json, State};
use rocket_auth::{Auth, Error};
use sqlx::PgPool;

use crate::model::success::PlainSuccess;

#[get("/games/map/upgrade?<number>")]
pub async fn upgrade_building(
    number: i32,
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<LevelUpResponse>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let data = sqlx::query!("
            SELECT u.money as money, b.level as level, CAST(((10 * (pow(1.15, b.level +1) - 1)) / 0.15) * pow(0.9, up.upgrades[3]) * pow(0.95, up.upgrades[4]) as INTEGER) as cost
            FROM users u
                     INNER JOIN buildings b on u.id = b.user_id
                     INNER JOIN upgrades up on u.id = up.user_id
            WHERE u.id = $1
            AND b.number = $2
            ORDER BY b.number;
        ", id, number)
        .fetch_one(&**conn)
        .await?;

    let cost = data.cost.unwrap();
    
    if data.money < cost {
        return Ok(Json(LevelUpResponse {
            number: -1,
            cost: -1,
        }));
    }

    sqlx::query!(
        r#"UPDATE users SET money = $1 WHERE id = $2"#,
        data.money - cost,
        id
    )
    .execute(&**conn)
    .await?;

    sqlx::query!(
        r#"UPDATE buildings SET level = $1 WHERE user_id = $2 AND number = $3"#,
        data.level + 1,
        id,
        number
    )
    .execute(&**conn)
    .await?;

    Ok(Json(LevelUpResponse { number, cost }))
}

#[get("/games/map/costs")]
pub async fn get_upgrade_cost(
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<BuildingsCost>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let data = sqlx::query!("
            SELECT b.level, CAST(((10 * (pow(1.15, b.level +1) - 1)) / 0.15) * pow(0.9, up.upgrades[3]) * pow(0.95, up.upgrades[4]) as INTEGER) as cost
            FROM users u
                     INNER JOIN buildings b on u.id = b.user_id
                     INNER JOIN upgrades up on u.id = up.user_id
            WHERE u.id = $1
            ORDER BY b.number;
        ", id)
        .fetch_all(&**conn)
        .await?;

    let res = BuildingsCost {
        levels: vec![data[0].level, data[1].level],
        costs: vec![data[0].cost.unwrap(), data[1].cost.unwrap()],
    };

    Ok(Json(res))
}

#[derive(Serialize)]
pub struct LevelUpResponse {
    number: i32,
    cost: i32,
}

#[derive(Serialize)]
pub struct BuildingsCost {
    levels: Vec<i32>,
    costs: Vec<i32>,
}
