use rocket_auth::{Auth, Error};

#[get("/logout")]
pub async fn logout(auth: Auth<'_>) -> Result<String, Error> {
    auth.logout()?;
    Ok("logout successful".to_string())
}