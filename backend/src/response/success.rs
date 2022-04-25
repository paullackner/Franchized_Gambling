use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct PlainSuccess {
    success: bool
}

impl PlainSuccess {
    pub fn success() -> Self{
        Self{success: true}
    }
}