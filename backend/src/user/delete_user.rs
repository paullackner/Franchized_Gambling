use rocket_auth::{Auth, Error};

#[get("/delete")]
pub async fn delete_user(auth: Auth<'_>) -> Result<(), Error> {
    auth.delete().await?;
    Ok(())
}