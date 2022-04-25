# Franchized gambleing backend
this is the bakcend of the franchized gambeling website which manages accounts and user sessions

# Documentation

## Signup

`/signup`

## HTTP method

<span class="label label-primary">POST</span>

## Parameters

| Parameter | Description                 | Data Type              |
| --------- | --------------------------- | ---------------------- |
| email     | email of user do sign up    | string in email format |
| password  | password of user do sign up | string                 |

Creates an account with hashed and salted password and creates a session

## Sample request
```js
var urlencoded = new URLSearchParams();
urlencoded.append("email", "paul.lackner@gmx.at");
urlencoded.append("password", "AbCD1234");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

```

## Sample response
``` json 
{
    "email": "paul.lackner@gmx.at"
}
```
---
## Login

`/login`

## HTTP method

<span class="label label-primary">POST</span>

## Parameters

| Parameter | Description                 | Data Type              |
| --------- | --------------------------- | ---------------------- |
| email     | email of user do sign up    | string in email format |
| password  | password of user do sign up | string                 |

Logs the user in and creates a session

## Sample request
```js
var urlencoded = new URLSearchParams();
urlencoded.append("email", "paul.lackner@gmx.at");
urlencoded.append("password", "AbCD1234");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
```

## Sample response
``` json 
{
    "email": "paul.lackner@gmx.at",
    "success": true
}
```
---
## Logout

`/logout`

## HTTP method

<span class="label label-primary">GET</span>

## Parameters

**No Parameters**  

Ends the user session

## Sample request
```js
var urlencoded = new URLSearchParams();
urlencoded.append("email", "paul.lackner@gmx.at");
urlencoded.append("password", "AbCD1234");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

```

## Sample response
``` json 
{
    "email": "paul.lackner@gmx.at"
}
```
---