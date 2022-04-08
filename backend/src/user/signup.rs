use rocket::{post, form::Form, response::status};
use rocket_auth::{Signup, Auth, Error};

#[post("/signup", data="<form>")]
pub async fn signup(form: Form<Signup>, auth: Auth<'_>) -> Result<status::Created<String>, Error>{
    let email = form.email.to_lowercase();
    auth.signup(&form).await?;
    auth.login(&form.into()).await?;
    Ok(status::Created::new("").tagged_body(format!("{{'email' : '{}' }}", email)))
}