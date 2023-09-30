# Simple Online Store API

This API is part of a simple online store system that allows users to register, log in, view products, place orders, and view purchase history. This API uses Express.js and MySQL as the database.

## Short Description

This API provides the following main features:

- New user registration.
- Login to the user account.
- Viewing the list of available products.
- Creating an order for a specific product.
- Viewing the user's purchase history.

## Program Design

The program follows a clean architecture that consists of several main components:

- **Repositories**: Provides access to the database and data model.
- **Routes**: Handles API routes and processing of requests from users.
- **Services**: Contains business logic, including authentication and authorization.
- **Utils**: Contains various utilities, including database configuration and response functions.

This API uses JSON Web Token (JWT) for authentication and bcrypt to encrypt user passwords.

## Algorithm

- The user is asked to register their account first.
- After registering, the user is asked to log in to his/her account. 
- Then the user can see the various products available
- After viewing, the user can make an order according to the existing product.
- And finally, users can view their purchase history 

## How to use

Here are the steps on how to use this API:

1. **Clone or Download Repository**
   - Clone this repository or download it as a ZIP.

2. **Move to Project Directory**
   - Navigate to the directory of the project you just cloned or downloaded.

3. **Install Dependencies**
   - Use `npm install` to install all the required dependencies.

4. **Database Configuration**
   - Open the `utils/db.js` file and configure the database connection according to your settings.

5. **Running the API**
   - Run `npm start` or `npm start:dev (if you installed nodemon globally)` to start the API server.

6. **Accessing the API**
   - Use Postman or a browser to access the API by viewing the list of available endpoints in the `routes` folder.

7. **Authentication and API Usage**
   - Some endpoints require authentication. Make sure you log in with a registered account and include the access token in the `Authorization` header.

8. **View `routes` Folder**
   - To know all the available endpoints and how to use them, view the files inside the `routes` folder.

### That's all and thank you
### Hope you liked it and happy exploring