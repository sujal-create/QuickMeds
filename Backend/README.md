# QuickMeds Backend

This is the backend server for the QuickMeds healthcare application.

## Features

- User authentication (signup, login)
- Admin authentication
- Doctor data retrieval
- Contact message handling
- MongoDB database integration

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/quickmeds
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/admin/login` - Admin login

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID

### Contact Messages
- `POST /api/contact` - Create a new contact message
- `GET /api/contact` - Get all contact messages (admin only)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing
