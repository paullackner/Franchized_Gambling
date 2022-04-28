use rocket_auth::{Auth, Error};
use rocket::serde::json::Json;

use crate::model::success::PlainSuccess;

#[get("/user/logout")]
pub async fn logout(auth: Auth<'_>) -> Result<Json<PlainSuccess>, Error> {
    auth.logout()?;
    Ok(Json(PlainSuccess::success()))
}