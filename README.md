# Backend
## Introduction
Documentation for Water My Plants 5 Backend

On successful login, a token is sent back that will be required in the header for all endpoints beyond registration/login.
## Endpoints
---
### Auth
#### Register
type:  **_POST_**

Registers a new user. Requires a JSON object in the body containing username, password, email, and phone number
###### Example:
```
.post( `https://wmpbackend.herokuapp.com/api/auth/register`, { username: 'user', password: 'pass', email: 'some@email.com', phone: '1234567890' } )
```
Returns a JSON object of the user, sans password.

---
#### Login
type:  **_POST_**

Logs a user into the backend DB. Requires a JSON object in body containing the username and password.
###### Example:
```
.post( `https://wmpbackend.herokuapp.com/api/auth/login`, { username: 'user', password: 'pass' } )
```
Returns a JSON object containing the authorization token, and welcome message

---
### Plants
#### Get all plants
type: **_GET_**

###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/plants` )
```
Returns an array of JSON objects of all the plants

---
#### Get plant by id
type: **_GET_**

###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/plants/1` )
```
Returns a JSON object containing the plant details

---
#### Post a plant to the DB
type: **_POST_**

Requires a JSON object in body containing the name and frequency.
###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/plants`, { name: 'plant name', frequency: 'weekly' } )
```
Returns a JSON object containing the added plant's details

---
#### Edit a plant
type: **_PUT_**

Requires a JSON object in body containing the changes
###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/plants`, { frequency: 'daily' } )
```
Returns a JSON object containing the edited plant's details

---
### Users
#### Get user details
type:  **_GET_**

###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/users` )
```
Returns a JSON object containing the current user's details

---
#### Update the username or password
type:  **_PUT_**

Requires a JSON object in body containing the changes
###### Example:
```
.put( `https://wmpbackend.herokuapp.com/api/users`, { password: 'newpass' } )
```
Returns a JSON object of the base user (no details, just username/password ( hashed ) )

---
#### Delete a user
type:  **_DELETE_**

###### Example:
```
.delete( `https://wmpbackend.herokuapp.com/api/users` )
```
Returns a JSON object of the deleted user

---
### User details
#### update user details (not username/password)
type:  **_PUT_**


Requires a JSON object in body containing the changes
###### Example:
```
.put( `https://wmpbackend.herokuapp.com/api/users/details`, {	"email": new@mail.com" } )
```
---
### User plants
#### get list of user's plants
type: **_GET_**

###### Example:
```
.get( `https://wmpbackend.herokuapp.com/api/users/plants` )
```
---
#### add a plant to a user
type: **_POST_**


Requires a JSON object in body containing the plant_id
###### Example:
```
.post( `https://wmpbackend.herokuapp.com/api/users/plants`, { plant_id: 1 } )
```
---
#### delete a plant from a user based on plant id
type: **_DELETE_**

###### Example:
```
.delete( `https://wmpbackend.herokuapp.com/api/users/plants/1` )
```
Returns the deleted plant object in JSON object notation

---
