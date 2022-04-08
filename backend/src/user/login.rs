use rocket::{post, form::Form};
use rocket_auth::{Login, Auth, Error};

#[post("/login", data="<form>")]
pub async fn login(form: Form<Login>, auth: Auth<'_>) -> Result<String, Error>{
    auth.login(&form).await?;
    Ok("loggin successful".to_string())
}