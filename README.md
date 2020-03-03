# Backend
_________________________________________________________
GET REQUESTS

| /api/users/:id | Returns a user object with details from the database |
| /api/users/:id/plants | Returns a specified user's plants |

POST REQUESTS

| /api/auth/register | Registers a new user. Requires a username, password, email, and phone number. | Returns an object with those details. |
| /api/auth/login | Logins a user in | Returns a token and a message |
| /api/users/:id | Post a plant to a specific user here. Takes a plant ID from the database. | Returns an array of all plants this user has. |

PUT REQUESTS

| api/users/:id | Edits a user's email or phone number. Does not need a full user object, only the field you are currently editing. |
| api/users/:id/plants/:user_plant_id | Deletes a specific plant from a specific user's list of plants. Takes a user_plant_id |
_________________________________________________________