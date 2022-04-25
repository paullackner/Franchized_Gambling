use rocket::{post, form::Form, serde::json::Json};
use rocket_auth::{Signup, Auth, Error};
use rocket::serde::Serialize;

#[post("/signup", data="<form>")]
pub async fn signup(form: Form<Signup>, auth: Auth<'_>) -> Result<Json<SignupResponse>, Error>{
    let email = form.email.to_lowercase();
    auth.signup(&form).await?;
    auth.login(&form.into()).await?;
    Ok(Json(SignupResponse {email}))
}

#[derive(Serialize)]
pub struct SignupResponse {
    email: String
}
