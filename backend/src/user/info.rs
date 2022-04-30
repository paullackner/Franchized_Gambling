use rocket_auth::{Auth, Error};
use rocket::{post, form::Form, serde::json::Json, State};
use sqlx::{query_as, PgPool};

use crate::model::{user::{UserInformation, self}, success::PlainSuccess};

#[get("/user/info")]
pub async fn get_info(auth: Auth<'_>, conn: &State<PgPool>) -> Result<Json<UserInformation>, Error> {

    let id = auth.get_user().await.unwrap().id();

    let user: UserInformation = 
        query_as(
                "SELECT *
                FROM users
                WHERE id = $1;"
                ,
            )
            .bind(id)
            .fetch_one(&**conn).await?;
                                
    Ok(Json(user))
}


#[post("/user/login", data="<form>")]
pub async fn set_info(form: Form<UserInformation>, auth: Auth<'_>) -> Result<Json<PlainSuccess>, Error>{
    let mut user = form.into_inner();

    

    Ok(Json(PlainSuccess::success()))
}