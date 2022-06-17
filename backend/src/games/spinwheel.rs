use chrono::{Date, Duration};
use rocket_auth::{Auth, Error};
use rocket::{post, form::Form, serde::json::Json, State, futures};
use rand::prelude::*;
use futures::{stream::TryStreamExt, future::TryFutureExt};
use sqlx::{PgPool, types::chrono::*};

use crate::{model::spin::{GameResult, SpinOption}};


#[get("/games/spin")]
pub async fn spin_wheel(auth: Auth<'_>, conn: &State<PgPool>) -> Result<Json<SpinOption>, Error>{
    let id = auth.get_user().await.unwrap().id();

    let ls: Option<NaiveDateTime> = sqlx::query!(r#"SELECT last_spin FROM users WHERE id = $1"#, id)
        .fetch_one(&**conn)
        .map_ok(|r| r.last_spin)
        .await?;

    if let Some(ls) = ls{

        if ls + Duration::days(1) > Utc::now().naive_utc(){
            return Ok(Json(SpinOption {item: "none".to_owned(), amount: 0}));
        }
    }

    let time = Utc::now().naive_utc();

    sqlx::query!(r#"UPDATE users SET last_spin = $1 WHERE id = $2"#, time, id)
    .execute(&**conn).await?;

    let mut item = "token".to_owned();
    let mut amount = 50;

    amount *= (rand::random::<f32>() * 10.0) as i32 + 1;

    if rand::random() {
        item = "money".to_owned();
        amount *= 10;

        sqlx::query!(r#"UPDATE users SET money = money + $1 WHERE id = $2"#, amount, id)
        .execute(&**conn).await?;
    } else {
        sqlx::query!(r#"UPDATE users SET token = token + $1 WHERE id = $2"#, amount, id)
        .execute(&**conn).await?;

    }


    Ok(Json(SpinOption{item, amount}))
}