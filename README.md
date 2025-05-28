# RailwayAPI

This project provides a set of APIs to manage and interact with railway-related data.

## Getting Started

Follow these steps to set up and start the project:

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL 
- NeonDB
- Prisma (ORM)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables. Example `.env` file:
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/railwaydb
     PORT=8000
     ```

4. Set up Prisma:
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```
   - Apply database migrations:
     ```bash
     npx prisma migrate dev
     ```

5. Start the application:
   ```bash
   npm start
   ```

6. Access the application at `http://localhost:<port>` (default port is 8000).

---

## API Documentation

### Base URL
`http://localhost:8000/api`

### Endpoints

#### 1. **Get All Trains**
   - **Endpoint:** `user/trains`
   - **Method:** `GET`
   - **Description:** Fetches a list of all trains.
   - **Response:**
     ```json
    {
    "success": true,
    "data": [],
    "message": "Trains Fetched Successfully"
    }
     ```



#### 2. **Add a New Train**
   - **Endpoint:** `admin/addTrain`
   - **Method:** `POST`
   - **Description:** Adds a new train to the system.
   - **Request Body:**
     ```json
     {
    "name": "Rajdhani Express 2",
    "source": "Bangalore",
    "destination": "Mumbai",
    "totalSeats": 340
    } 

     ```
   - **Response:**
     ```json
    {
  "success": true,
  "data": {
    "id": 3,
    "name": "Rajdhani Express 2",
    "source": "Bangalore",
    "destination": "Mumbai",
    "totalSeats": 340
  },
  "message": "Train Added Successfully"
    }
     ```





#### 3. **Get User Bookings**
   - **Endpoint:** `/user/bookings`
   - **Method:** `GET`
   - **Description:** Fetches booking details of a user.
   - **Response:**
     ```json
    {
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 2,
      "trainId": 1,
      "createdAt": "2025-05-28T10:07:43.352Z"
    },
    {
      "id": 2,
      "userId": 2,
      "trainId": 2,
      "createdAt": "2025-05-28T10:09:41.584Z"
    }
  ],
  "message": "Bookings Fetched Successfully"
    }
     ```

#### 4. **Book a Train**
   - **Endpoint:** `/user/book`
   - **Method:** `POST`
   - **Description:** Books a train for a user.
   - **Request Body:**
     ```json
    {
  "trainId": 2
    }
     ```
   - **Response:**
     ```json
    {
  "success": true,
  "data": {
    "id": 2,
    "userId": 2,
    "trainId": 2,
    "createdAt": "2025-05-28T10:09:41.584Z"
  },
  "message": "Seat Booked Successfully"
    } 
     ```

#### 5. **Login**
   - **Endpoint:** `/auth/login`
   - **Method:** `POST`
   - **Description:** Logs in a user.
   - **Request Body:**
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
    {
  "success": true,
  "token": "nldnva...",
  "message": "Login Successfully"
    }
     ```

#### 6. **Register**
   - **Endpoint:** `/auth/register`
   - **Method:** `POST`
   - **Description:** Registers a new user.
   - **Request Body:**
     ```json
     {
       "name": "John Doe",
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Registration successful",
       "userId": "456"
     }
     ```




---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

---


