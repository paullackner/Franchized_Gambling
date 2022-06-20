use chrono::Utc;
use rocket::serde::Serialize;
use rocket::{form::Form, post, serde::json::Json, State};
use rocket_auth::{Auth, Error};
use sqlx::{self, query, query_as, PgPool};

use crate::model::{
    success::PlainSuccess,
    user::{self, UserInformation, UserName},
};

#[get("/user/info")]
pub async fn get_info(
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<UserInformation>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let mut user: UserInformation = query_as(
        "SELECT *
                FROM users
                WHERE id = $1;",
    )
    .bind(id)
    .fetch_one(&**conn)
    .await?;

    if user.last_calc.is_some() {
        let earnings = sqlx::query!(
            "
                    SELECT SUM(CAST(((10 * (pow(1.05, b.level +1) - 1)) / 0.15) * pow(0.9, up.upgrades[1]) * pow(0.95, up.upgrades[2]) * extract(epoch from (current_timestamp - u.last_calc))/60  as INTEGER)) as earnings
                    FROM users u
                        INNER JOIN buildings b on u.id = b.user_id
                        INNER JOIN upgrades up on u.id = up.user_id
                    WHERE u.id = $1;
                ", id
        )
        .fetch_one(&**conn)
        .await?.earnings.unwrap();

        sqlx::query!(
            r#"UPDATE users SET money = $1 WHERE id = $2"#,
            user.money + earnings as i32,
            id
        )
        .execute(&**conn)
        .await?;
    }

    let time = Utc::now().naive_utc();

    sqlx::query!(r#"UPDATE users SET last_calc = $1 WHERE id = $2"#, time, id)
        .execute(&**conn)
        .await?;

    Ok(Json(user))
}

#[post("/user/set-name", data = "<form>")]
pub async fn set_display_name(
    form: Form<UserName>,
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Json<PlainSuccess>, Error> {
    let user = form.into_inner();
    let id = auth.get_user().await.unwrap().id();

    query(
        "UPDATE users 
        SET display_name = $1 
        WHERE id = $2",
    )
    .bind(user.name)
    .bind(id)
    .execute(&**conn)
    .await?;

    Ok(Json(PlainSuccess::success()))
}

#[get("/user/leaderboard")]
pub async fn get_leaderboard(conn: &State<PgPool>) -> Result<Json<Leaderboard>, Error> {
    let data = sqlx::query!(
        "
            SELECT display_name as name, money
            FROM users
            WHERE display_name IS NOT NULL
            ORDER BY money DESC
            LIMIT 10;
        ",
    )
    .fetch_all(&**conn)
    .await?;

    let mut users = Vec::new();

    for row in data {
        users.push((row.name.unwrap(), row.money));
    }

    Ok(Json(Leaderboard { users }))
}

#[derive(Serialize)]
struct Leaderboard {
    users: Vec<(String, i32)>,
}
