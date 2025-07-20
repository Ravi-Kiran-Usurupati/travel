# Backend API Documentation

## For User


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



### `/users/profile` Endpoint 

#### Description
Retrieves the authenticated user's profile information. Requires authentication token.

#### HTTP Method
`GET`

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Status Codes
- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: Missing or invalid authentication token.



---

### `/users/logout` Endpoint 

#### Description
Logs out the current user by clearing the authentication cookie and blacklisting the current token.

#### HTTP Method
`GET`

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Status Codes
- `200 OK`: Successfully logged out.
- `401 Unauthorized`: Missing or invalid authentication token.

#### Example Response
```json
{
    "message": "Logged out successfully"
}
```
## For Captain 

### `/captains/register` Endpoint

#### Description
Registers a new captain by validating the provided data and creating a captain record in the database. On successful registration, an authentication token and captain details are returned.

#### HTTP Method
`POST`

#### Required Data
- `fullName`: An object containing:
  - `firstName`: (String) Required.
  - `lastName`: (String) Required.
- `email`: (String) A valid email address.
- `password`: (String) Must be at least 6 characters long.
- `vehicle`: An object containing:
  - `color`: (String) Required.
  - `plate`: (String) Required, unique.
  - `capacity`: (Number) Required, between 1 and 20.
  - `vehicleType`: (String) Required, one of `car`, `auto`, `motorcycle`.
  - `location`: (Object, optional)
    - `lat`: (Number)
    - `lng`: (Number)

#### Status Codes
- `201 Created`: Registration successful.
- `400 Bad Request`: Validation errors occurred.


#### Example Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODdjY2U3MWM1ZWVmZTE1OTc2OTY1YjAiLCJpYXQiOjE3NTMwMDk3NzcsImV4cCI6MTc1MzA5NjE3N30.mG3Go26Ixjfi-AF4HZGQ3v9vJVrJD768VdPHiaDLlok",
    "captain": {
        "fullName": {
            "firstName": "test_driver1",
            "lastName": "test_last1"
        },
        "email": "testdrive1@gmail.com",
        "password": "$2b$10$/PkgVbrciBAkxfRKpBtX/e51qi05PidIk2pJre/a4O/BXSGshhQJC",
        "status": "inactive",
        "vehicle": {
            "color": "blue",
            "plate": "AP39GS91",
            "capacity": 4,
            "vehicleType": "car"
        },
        "_id": "687cce71c5eefe15976965b0",
        "__v": 0
    }
}

```
### `/captains/login` Endpoint

#### Description
Logs in an existing captain by verifying the provided credentials. On successful login, an authentication token and captain details (without the password) are returned.

#### HTTP Method
`POST`

#### Required Data
- `email`: (String) A valid email address.
- `password`: (String) Password is required.

#### Status Codes
- `200 OK`: Login successful.
- `400 Bad Request`: Validation errors occurred or invalid credentials.



---

### `/captains/profile` Endpoint

#### Description
Retrieves the authenticated captain's profile information. Requires authentication token.

#### HTTP Method
`GET`

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Status Codes
- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: Missing or invalid authentication token.



---

### `/captains/logout` Endpoint

#### Description
Logs out the current captain by clearing the authentication cookie and blacklisting the current token.

#### HTTP Method
`GET`

#### Authentication
Requires valid JWT token in Authorization header or cookie.

#### Status Codes
- `200 OK`: Successfully logged out.
- `401 Unauthorized`: Missing or invalid authentication token.

#### Example Response
```json
{
  "message": "Logged out successfully"
}
```