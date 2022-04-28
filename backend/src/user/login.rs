use rocket::{post, form::Form, serde::json::Json};
use rocket_auth::{Login, Auth, Error};
use rocket::serde::Serialize;


#[post("/user/login", data="<form>")]
pub async fn login(form: Form<Login>, auth: Auth<'_>) -> Result<Json<LoginResponse>, Error>{
    let email = form.email.to_lowercase();
    auth.login(&form).await?;
    Ok(Json(LoginResponse {email, success: true}))
}

#[derive(Serialize)]
pub struct LoginResponse {
    email: String,
    success: bool 
}