use rocket_auth::{Auth, Error};
use rocket::serde::json::Json;

use crate::response::success::PlainSuccess;


#[get("/delete")]
pub async fn delete_user(auth: Auth<'_>) -> Result<Json<PlainSuccess>, Error> {
    auth.delete().await?;
    Ok(Json(PlainSuccess::success()))
}