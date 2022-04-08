use rocket_auth::{Auth, Error};

#[get("/delete")]
pub async fn delete_user(auth: Auth<'_>) -> Result<String, Error> {
    auth.delete().await?;
    Ok("user deleted".to_string())
}