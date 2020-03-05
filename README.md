# Backend
_________________________________________________________

## Introduction
Documentation for Water My Plants 5 Backend

On successful login, a token is sent back that will be required in the header for all endpoints beyond registration/login.

## Endpoints
---
### Auth
#### Register
**_POST_**

Registers a new user. Requires a username, password, email, and phone number
###### Example
```
.post( `https://wmpbackend.herokuapp.com/api/auth/register`, { username: 'user', password: 'pass', email: 'some@email.com', phone: '1234567890' } )
```
Returns a JSON object of the user, sans password.

---

#### Login
**_POST_**

Logs a user into the backend DB
###### Example
```
.post( `https://wmpbackend.herokuapp.com/api/auth/login`, { username: 'user', password: 'pass' } )
```
Returns a JSON object containing the authorization token, and welcome message

---
### Users

#### Get user details
**_GET_**
###### Example
```
.get( `https://wmpbackend.herokuapp.com/api/users` )
```
Returns a JSON object containing the current user's details

---

#### Update the username or password
**_PUT_**
###### Example
```
.put( `https://wmpbackend.herokuapp.com/api/users`, { password: 'newpass' } )
```
Returns a JSON object of the base user (no details, username/password (hashed))

---
#### Delete a user
**_DELETE_**
###### Example
```
.delete( `` )
```
Returns a JSON object of the deleted user