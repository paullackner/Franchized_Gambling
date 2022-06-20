use rocket_auth::{Auth, Error};
use rocket::{serde::json::Json, response::Redirect};

use crate::model::success::PlainSuccess;

#[get("/user/logout")]
pub async fn logout(auth: Auth<'_>) -> Result<Redirect, Error> {
    auth.logout()?;
    Ok(Redirect::to("/"))
}