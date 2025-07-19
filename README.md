## Backend API Documentation
### `/users/register` Endpoint 

#### Description
Registers a new user by validating the provided data and creating a user record in the database. On successful registration, an authentication token and user details are returned.

#### HTTP method
`POST`


#### Required Data
- `fullName`: An object containing:
  - `firstName`: (String) Required.
  - `lastName`: (String) Required.
- `email`: (String) A valid email address.
- `password`: (String) Must be at least 6 characters long.

#### Status Codes
- `201 Created`: Registration successful.
- `400 Bad Request`: Validation errors occurred.

#### Example Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdiM2Q3ODQyN2I0ZDk3NjQ1MzIwYjYiLCJpYXQiOjE3NTI5MDcxMjh9.nxGmt4DBfnlEvERXiMdBS8svLaHFUsQSFfDJtWooyLQ",
    "user": {
        "fullName": {
            "firstName": "test_name",
            "lastName": "last_name"
        },
        "email": "test123@gmail.com",
        "password": "$2b$10$X.2id4HjMbkIn1dseIjxoeHvLDMjjPScfTopvcGOLCeeCVFQXxQbC",
        "_id": "687b3d78427b4d97645320b6"
    }
}
```

---

### `/users/login` Endpoint 

#### Description
Logs in an existing user by verifying the provided credentials. On successful login, an authentication token and user details (without the password) are returned.

#### HTTP Method
`POST`

#### Required Data
- `email`: (String) A valid email address.
- `password`: (String) Password is required.

#### Status Codes
- `200 OK`: Login successful.
- `400 Bad Request`: Validation errors occurred.
- `401 Unauthorized`: Invalid email or incorrect password.

