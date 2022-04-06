use rocket::{post, form::Form};
use rocket_auth::{Signup, Auth, Error};

#[post("/signup", data="<form>")]
pub async fn signup(form: Form<Signup>, auth: Auth<'_>) -> Result<(), Error>{
    auth.signup(&form).await?;
    auth.login(&form.into()).await?;
    Ok(())
}