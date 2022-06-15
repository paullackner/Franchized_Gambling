use rocket::serde::Serialize;
use serde::ser::{SerializeStruct, Serializer};

#[derive(Serialize)]
pub struct SpinOption {
    pub item: String,
    pub amount: i32
}

#[derive(Serialize)]
pub struct GameResult {
    pub win: bool,
    pub amount: i32,
}