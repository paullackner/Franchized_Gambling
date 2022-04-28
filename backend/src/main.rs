#[macro_use] extern crate rocket;

use rocket::{tokio::{self}, fs::FileServer};
use rocket_auth::Users;
use sqlx::{PgPool, Error};

mod user;
mod model;
use user::{login::*, signup::*, delete_user::*, logout::*};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let conn = PgPool::connect("postgresql://admin:passwort@localhost:5243/gamble").await?;
    let users: Users = conn.clone().into();

    rocket::build()
    .mount("/", routes![login, signup, delete_user, logout])
    .mount("/", FileServer::from("../frontend/build"))
    .manage(conn)
    .manage(users)
    .launch()
    .await
    .unwrap();
    
    Ok(())
}
