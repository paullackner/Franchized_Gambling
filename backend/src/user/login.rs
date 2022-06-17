use rocket::{post, form::Form, serde::json::Json, response::Redirect};
use rocket_auth::{Login, Auth, Error};
use rocket::serde::Serialize;


#[post("/user/login", data="<form>")]
pub async fn login(form: Form<Login>, auth: Auth<'_>) -> Result<Redirect, Error>{
    let email = form.email.to_lowercase();
    auth.login(&form).await?;
    Ok(Redirect::to("/"))
}