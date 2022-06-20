use futures::{future::TryFutureExt, stream::TryStreamExt};
use rocket::State;
use rocket::response::Redirect;
use rocket::serde::Serialize;
use rocket::{form::Form, futures, post, serde::json::Json};
use rocket_auth::{Auth, Error, Signup};
use sqlx::PgPool;

#[post("/user/signup", data = "<form>")]
pub async fn signup(
    form: Form<Signup>,
    auth: Auth<'_>,
    conn: &State<PgPool>,
) -> Result<Redirect, Error> {
    let email = form.email.to_lowercase();
    auth.signup(&form).await?;
    auth.login(&form.into()).await?;

    let id = sqlx::query!(
        "
        SELECT id
        FROM users
        WHERE email = $1;
        ", email
    )
    .fetch_one(&**conn)
    .await?.id;

    sqlx::query!(
        "
        INSERT INTO public.buildings (user_id, number, level)
        VALUES 
            ($1, 0, DEFAULT),
            ($1, 1, DEFAULT);
        ",
        id
    )
    .execute(&**conn)
    .await?;

    sqlx::query!(
        "
        INSERT INTO public.upgrades (ups_id, user_id, upgrades)
        VALUES (DEFAULT, $1, DEFAULT);
        ",
        id
    )
    .execute(&**conn)
    .await?;

    Ok(Redirect::to("/"))
}
