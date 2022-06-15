use rocket_auth::{Auth, Error};
use rocket::{post, form::Form, serde::json::Json, State, futures};
use rand::prelude::*;
use futures::{stream::TryStreamExt, future::TryFutureExt};
use sqlx::PgPool;


use crate::{model::spin::GameResult};


#[get("/games/flip?<bet>")]
pub async fn flip_amount(mut bet: i32, auth: Auth<'_>, conn: &State<PgPool>) ->  Result<Json<GameResult>, Error> {
    let id = auth.get_user().await.unwrap().id();

    let token = sqlx::query!(r#"SELECT token FROM users WHERE id = $1"#, id)
        .fetch_one(&**conn)
        .map_ok(|r| r.token)
        .await?.unwrap();

    let win: bool = rand::random();

    if bet > token {
        return Ok(Json(GameResult{win: false, amount: 0}));
    }

    if !win {
        bet = -bet;
    }

    sqlx::query!(r#"UPDATE users SET token = $1 WHERE id = $2"#, token + bet, id)
    .execute(&**conn).await?;

    
    Ok(Json(GameResult{win, amount: bet}))
}