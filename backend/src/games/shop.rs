use std::vec;

use futures::{future::TryFutureExt, stream::TryStreamExt};
use rand::prelude::*;
use rocket::serde::Serialize;
use rocket::{form::Form, futures, post, serde::json::Json, State};
use rocket_auth::{Auth, Error};
use sqlx::PgPool;

use crate::model::success::PlainSuccess;

#[get("/shop/buy?<number>")]
pub async fn buy_upgrade(
    number: i32,
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<BuyResponse>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let data = sqlx::query!("
            SELECT u.token as token, CAST(((10 * (pow(1.10, upgrades[$1] +1) - 1)) / 0.15) as INTEGER) as cost, upgrades[$1] as level
            FROM users u
                     INNER JOIN upgrades up on u.id = up.user_id
            WHERE u.id = $2;
        ", number, id)
        .fetch_one(&**conn)
        .await?;

    let cost = data.cost.unwrap();

    if data.token < cost {
        return Ok(Json(BuyResponse {
            number: -1,
            cost: -1,
        }));
    }

    sqlx::query!(
        r#"UPDATE users SET token = $1 WHERE id = $2"#,
        data.token - cost,
        id
    )
    .execute(&**conn)
    .await?;

    sqlx::query!(
        "UPDATE upgrades SET upgrades[$1] = $2 WHERE user_id = $3;",
        number,
        data.level.unwrap() + 1,
        id,
    )
    .execute(&**conn)
    .await?;

    Ok(Json(BuyResponse { number, cost }))
}

#[get("/shop/costs")]
pub async fn get_upgrade_costs(
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<UpgradeCosts>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let data = sqlx::query!(
        "
            SELECT
                CAST(((10 * (pow(1.10, upgrades[1] +1) - 1)) / 0.15) as INTEGER) as up1,
                CAST(((10 * (pow(1.10, upgrades[2] +1) - 1)) / 0.15) as INTEGER) as up2,
                CAST(((10 * (pow(1.10, upgrades[3] +1) - 1)) / 0.15) as INTEGER) as up3,
                CAST(((10 * (pow(1.10, upgrades[4] +1) - 1)) / 0.15) as INTEGER) as up4,
                upgrades
            FROM users u
                     INNER JOIN upgrades up on u.id = up.user_id
            WHERE u.id = $1;
        ", id
    )
    .fetch_one(&**conn)
    .await?;

    Ok(Json(UpgradeCosts{upgrades: data.upgrades, costs: vec![data.up1.unwrap(), data.up2.unwrap(), data.up3.unwrap(), data.up4.unwrap()]}))
}

#[get("/shop/token")]
pub async fn buy_token(
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<PlainSuccess>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let data = sqlx::query!("
            SELECT money, token
            FROM users
            WHERE id = $1;
        ", id)
        .fetch_one(&**conn)
        .await?;


    if data.money < 1000 {
        return Ok(Json(PlainSuccess::fail()));
    }

    sqlx::query!(
        "UPDATE users SET token = $1, money = $2 WHERE id = $3",
        data.token + 10,
        data.money - 1000,
        id
    )
    .execute(&**conn)
    .await?;

    Ok(Json(PlainSuccess::success()))
}

#[derive(Serialize)]
pub struct BuyResponse {
    number: i32,
    cost: i32,
}

#[derive(Serialize)]
pub struct UpgradeCosts {
    upgrades: Vec<i32>,
    costs: Vec<i32>,
}
