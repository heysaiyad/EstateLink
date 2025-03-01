# Real Estate Web App

## Overview
This project is a Real Estate Web Application that allows users to buy, sell, and rent properties. The application includes features such as user authentication, real-time chat, notifications, and property management.

## Features
- User Authentication (Register, Login, Logout)
- Real-time Chat using Socket.io
- Notifications using Zustand
- Property Management (Create, Read, Update, Delete)
- Search and Filter Properties
- Responsive Design

## Technologies Used
- Frontend: React, Zustand, React Router, Axios, Leaflet, Sass
- Backend: Node.js, Express, Prisma, MongoDB, JWT, Bcrypt
- Real-time Communication: Socket.io
- Deployment: render

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/heysaiyad/EstateLink.git
    cd EstateLink
    ```

2. Install server dependencies:
    ```bash
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd client
    npm install
    cd ..
    ```

4. Set up environment variables:
    Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following:
    ```env
    DATABASE_URL=<your_mongodb_connection_string>
    JWT_SECRET_KEY=<your_jwt_secret_key>
    ```

5. Run Prisma migrations:
    ```bash
    npx prisma db push
    ```

6. Start the server:
    ```bash
    npm start
    ```

7. Start the client:
    ```bash
    cd client
    npm run dev
    ```

## Usage
- Open your browser and navigate to `http://localhost:5173` to access the application.
- Register a new account or log in with an existing account.
- Explore properties, use the search and filter features, and manage your profile.
- Use the chat feature to communicate with other users in real-time.

## Project Structure
- [client](http://_vscodecontentref_/2): Contains the frontend code.
- [controllers](http://_vscodecontentref_/3): Contains the backend controllers.
- [middleware](http://_vscodecontentref_/4): Contains the middleware functions.
- [routes](http://_vscodecontentref_/5): Contains the backend routes.
- [lib](http://_vscodecontentref_/6): Contains the Prisma client setup.