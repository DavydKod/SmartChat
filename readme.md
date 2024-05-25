# Messenger 
Application for instant messaging in private and group chats.

## Prerequisites:
Install IDE (WebStorm)

Install Node.js (version 14.x or later)

Install npm (version 6.x or later)

## Frontend Setup
1. Navigate to the frontend directory: `cd frontend`

2. Install dependencies: `npm install`

3. Start the development server: `npm start`

The frontend will be available at http://localhost:3000.

## Backend Setup
1. Navigate to the backend directory: `cd ../backend`

2. Install dependencies: `npm install`

3. Create a .env file in the root of the backend directory and add the following environment variables:
   DB_URL=DB_URL=mongodb://localhost:27017/yourdatabase.

   PORT=4000

   ACCESS_TOKEN_SECRET=mysecretkey

4. Start the server: `npm start`

The backend will be available at http://localhost:4000.