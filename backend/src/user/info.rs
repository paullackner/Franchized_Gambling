use rocket_auth::{Auth, Error};
use rocket::{post, form::Form, serde::json::Json, State};
use sqlx::{query_as, PgPool, query};

use crate::model::{user::{UserInformation, self, UserName}, success::PlainSuccess};

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


#[post("/user/set-name", data="<form>")]
pub async fn set_display_name(form: Form<UserName>, auth: Auth<'_>, conn: &State<PgPool>) -> Result<Json<PlainSuccess>, Error>{
    let user = form.into_inner();
    let id = auth.get_user().await.unwrap().id();
    
    query(
        "UPDATE users 
        SET display_name = $1 
        WHERE id = $2"
    )
    .bind(user.name)
    .bind(id)
    .execute(&**conn).await?;

    Ok(Json(PlainSuccess::success()))
}