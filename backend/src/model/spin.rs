use rocket::serde::Serialize;
use serde::ser::{SerializeStruct, Serializer};

#[derive(Serialize)]
pub struct SpinOption {
    item: String,
    amount: i32
}

#[derive(Serialize)]
pub struct SpinWheel {
    data: [SpinOption; 10]
}

