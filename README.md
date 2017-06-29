A sample REST microservice that allows registering users and authenticating
using username/password.

Uses bcrypt to store hashed passwords in MongoDB.
Uses JWT to authenticate access to protected routes in api.

SERVICE DETAILS
---------------
- Service runs at localhost:8080
  - Run service using nodemon server.js

- Run a mongodb and create a sampleauth document.
  - mongod --dbpath=testing
  - mongo
    - > db
        test
    - > use sampleauth
        switched to db sampleauth
    - > exit
- Run service using nodemon server.js


API Spec

Protected
----------
GET /api/users
  - Set Headers
    - x-access-token

Unprotected
-----------
POST /api/setup
  - Set Body to contain x-www-form-urlencoded
    - name
    - password
POST /api/authenticate
  - Set Body to contain x-www-form-urlencoded
    - name
    - password


Tested using Postman
