# Hostel Management System

A web application for managing hostel students, rooms, and notifications, with role-based access control.

## Features

- **User Authentication:** Secure login and verification for admin and student roles.
- **Role-Based Access Control:** Different features and data visibility based on user roles (Admin or Student).
- **Student Management (Admin Only):**
  - Add new students
  - View all students
  - Update student details
  - Delete students
- **Room Management (Admin Only):**
  - Add new rooms
  - View all rooms
  - Update room details
  - Delete rooms
- **Notification Management:**
  - View notifications (All users)
  - Add new notifications (Admin Only)
  - Delete notifications (Admin Only)
- **Dashboard:**
  - Overview of room and student counts (Admin Only)
  - Display of logged-in student's details (Student Only)
- **Responsive UI:** Built with React and Tailwind CSS for a modern look and feel.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand (for state management)
  - Axios (for API calls)
- **Backend:**
  - Node.js/Express.js
  - TypeScript
  - Better SQLite3 (for database interaction)
  - JSON Web Tokens (JWT) (for authentication)
- **Database:**
  - SQLite

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd clg-hostel-management
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   # In the project root
   npm install
   # or yarn install

   # Navigate to the client directory
   cd client
   npm install
   # or yarn install

   # Navigate back to the root and then to the server directory
   cd ../server
   npm install
   # or yarn install
   ```
3. Set up environment variables (if any - check backend `.env.example` if provided, otherwise assume defaults or configure directly).
4. Build and run the backend:
   ```bash
   cd ../server
   npm run build
   npm start
   # or yarn build && yarn start
   ```
5. Run the frontend:
   ```bash
   cd ../client
   npm start
   # or yarn start
   ```

## Usage

1. Access the application at `http://localhost:4040` (or the configured frontend port).
2. Log in with admin or student credentials.
3. Navigate through the sidebar to access available features based on your role.

## API Endpoints

The backend provides RESTful API endpoints for managing users, students, rooms, and notifications. (Details can be found by exploring the backend code in `server/src/routes` and `server/src/controllers`).

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.
