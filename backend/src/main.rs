#[macro_use] extern crate rocket;

use std::path::{PathBuf, Path};

use rocket::{tokio::{self}, fs::{FileServer, NamedFile}};
use rocket_auth::Users;
use sqlx::{PgPool, Error};
use rand::prelude::*;

mod user;
mod model;
mod games;
use user::{login::*, signup::*, delete_user::*, logout::*, info::*};
use games::{flip::*, spinwheel::*, map::*, shop::*};


#[tokio::main]
async fn main() -> Result<(), Error> {
    let conn = PgPool::connect("postgresql://admin:passwort@localhost:5243/gamble").await?;
    let users: Users = conn.clone().into();

    rocket::build()
    .mount("/", routes![
                                frontend, login, signup, delete_user, 
                                logout, get_info, set_display_name, flip_amount, 
                                spin_wheel, upgrade_building, get_upgrade_cost,
                                get_leaderboard, get_upgrade_costs, buy_upgrade,
                                buy_token
                                ])
    .mount("/", FileServer::from("../frontend/build").rank(1))
    .manage(conn)
    .manage(users)
    .launch()
    .await
    .unwrap();
    
    Ok(())
}


#[get("/<_..>", rank=2)]
async fn frontend() -> Option<NamedFile> {
    NamedFile::open(Path::new("../frontend/build/index.html")).await.ok()
}
