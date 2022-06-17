use chrono::{NaiveDate, NaiveDateTime};
use rocket::serde::{Deserialize, Serialize};
use serde::ser::SerializeStruct;

#[cfg_attr(feature = "sqlx", derive(sqlx::FromRow))]
#[derive(sqlx::FromRow)]
pub struct UserInformation {
    pub id: i32,
    pub display_name: Option<String>,
    pub money: Option<i32>,
    pub token: Option<i32>,
    pub last_spin: Option<NaiveDateTime>
}

impl Serialize for UserInformation {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut s = serializer.serialize_struct("Person", 5)?;

        s.serialize_field("id", &self.id);
        s.serialize_field("name", &self.display_name);
        s.serialize_field("money", &self.money);
        s.serialize_field("token", &self.token);
        s.serialize_field("last_spin", &self.last_spin.map_or(None, |x| Some(x.format("%Y-%m-%d-%H-%M-%S").to_string())));
        s.end()
    }
}

#[derive(FromForm, Deserialize, Clone)]
pub struct UserName {
    pub name: String
}