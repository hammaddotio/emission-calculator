# Project Documentation

## 1. Introduction

This project is a role-based web application with 3-4 pages, built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It features role-based access control with two user roles: **Admin** and **User**. The **Admin** has access to a dashboard for managing users and viewing the totals of several calculators. Users can perform calculations through the provided calculators.

### Key Features:

- **Admin User Management**: Only the admin can create and manage users.
- **Login System**: Users can log in using their email and password.
- **Calculators**: Six emission-related calculators available for user input.
- **Admin Dashboard**: Allows admins to view user data, perform CRUD operations on users, and visualize data with charts (pie, bar).

## 2. Installation

### System Requirements:

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js
- **Authentication**: JWT (JSON Web Token)

### Installation Steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```
3. Create a `.env` file in the backend directory and add environment variables:
   ```bash
   MONGO_URI=<MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret>
   PORT=<Backend Port>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

## 3. Roles & Access Control

### User Roles:

- **Admin**:
  - Can create and manage user accounts (CRUD operations).
  - Can view calculator data and totals for each user.
  - Can filter data by user and view it in charts (pie, bar).
- **User**:
  - Can log in and use the available calculators for their emissions-related calculations.

### Routes Access:

- **Login Page** (unauthenticated users)
- **Dashboard** (admin only)
- **Users Management** (admin only)
- **Calculators** (for regular users)

## 4. User Management

### Admin-Managed Users:

- Admins create users with:
  - **Email** (must be unique)
  - **Password**
  - **Username**
  - **User Role** (either "admin" or "user")
- Admins can update any user's:
  - Email (must remain unique)
  - Password
  - Username
  - User Role
- Admins can delete users.

### Login Credentials:

- Users log in using their **email** and **password**. There is no option for user self-registration.

## 5. Usage

### Login Page:

- Users (both Admin and regular) log in using their credentials (email and password).
- After successful login:
  - **Admin**: Redirected to the dashboard.
  - **User**: Redirected to the calculators page.

### Calculator Page (User):

- Users can access and input data into six different calculators:

  1. **Mobile Combustion**
  2. **Stationary Combustion**
  3. **Fire Suppressants**
  4. **AC & Refrigerants**
  5. **Purchased Gas**
  6. **Electricity Supply**

- Calculators accept inputs like energy consumption, fuel usage, etc.
- Once submitted, the results are stored in the backend, and admins can view the totals.

### Admin Dashboard:

- Admins can:
  - View a list of all users.
  - Perform CRUD operations on users (create, update, delete).
  - View calculator totals for all users.
  - Filter totals by specific users.
  - Visualize the data through charts (pie and bar).

## 6. API Endpoints

### Authentication

- **POST /api/auth/login**: Login a user with their email and password.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "JWT Token",
      "role": "admin" or "user"
    }
    ```

### Admin - User Management

- **GET /api/admin/users**: Retrieve all users.
- **POST /api/admin/users**: Create a new user.
  - Request Body:
    ```json
    {
      "email": "newuser@example.com",
      "password": "password123",
      "username": "NewUser",
      "role": "user" // or "admin"
    }
    ```
- **PUT /api/admin/users/:id**: Update user details.
  - Request Body:
    ```json
    {
      "email": "updateduser@example.com",
      "password": "newpassword123",
      "username": "UpdatedUser",
      "role": "admin" // or "user"
    }
    ```
- **DELETE /api/admin/users/:id**: Delete a user by ID.

### Calculators (User)

- **GET /api/calculators**: Retrieve available calculators.
- **POST /api/calculators/:id**: Submit calculation data for a specific calculator.
  - Example Request Body (for Mobile Combustion):
    ```json
    {
      "distanceTraveled": 500,
      "fuelConsumed": 40
    }
    ```

### Admin - Data Overview

- **GET /api/admin/calculations/totals**: Retrieve total data for all users and calculators.
- **GET /api/admin/calculations/user/:userId**: Retrieve total data filtered by a specific user.

## 7. Calculators Overview

### Mobile Combustion:

- Input: Distance traveled, fuel consumed.

### Stationary Combustion:

- Input: Fuel type, amount of energy used.

### Fire Suppressants:

- Input: Amount of extinguishing agent used.

### AC & Refrigerants:

- Input: Refrigerant type, amount of refrigerant used/leaked.

### Purchased Gas:

- Input: Amount of gas purchased.

### Electricity Supply:

- Input: Amount of electricity consumed.

## 8. Charts (Admin)

Admins can visualize data via charts:

- **Pie Chart**: Breaks down data by calculator type (e.g., how much gas was used by all users).
- **Bar Chart**: Displays totals across all calculators or filtered by a specific user.

## 9. Troubleshooting

- **Login Issues**: Ensure credentials are correct. Check for valid JWT tokens.
- **User Management**: Ensure unique emails when creating or updating users.
- **Data Submission Errors**: Verify that correct input types are provided for each calculator.
- **Charts Rendering**: Ensure the data being fetched is correct and in the appropriate format for chart rendering.
