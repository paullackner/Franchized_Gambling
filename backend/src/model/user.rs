use rocket::serde::{Deserialize, Serialize};

#[cfg_attr(feature = "sqlx", derive(sqlx::FromRow))]
#[derive(Serialize, sqlx::FromRow, FromForm)]
pub struct UserInformation {
    pub id: i32,
    pub display_name: Option<String>,
    pub money: Option<i32>,
    pub token: Option<i32>,
    pub last_spin: Option<String>
}

#[derive(FromForm, Deserialize, Clone)]
pub struct UserName {
    pub name: String
}