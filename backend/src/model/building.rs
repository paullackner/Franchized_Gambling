use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct Building {
    id: i32,
    level: i32,
}