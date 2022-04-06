use rocket_auth::{Auth, Error};

#[get("/logout")]
pub async fn logout(auth: Auth<'_>) -> Result<(), Error> {
    auth.logout()?;
    Ok(())
}