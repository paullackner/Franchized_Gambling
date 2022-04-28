use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct SpinRespone<T> {
    success: bool,
    result: T
}


#[derive(Serialize)]
pub struct Spin {
    item: String,
    amount: i32
}