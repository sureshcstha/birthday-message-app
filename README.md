# Birthday Message API

A Node.js/Express API for managing users and sending automated birthday messages via email and SMS.

This API provides user authentication, API key management, and user management functionalities. Users can sign up, log in, retrieve their API key, change passwords, regenerate their API key, and manage user information.

## Features

- User management (add, update, delete, subscribe/unsubscribe)
- API key authentication for secure access
- Role-based authorization (admin, superadmin)
- Automated birthday message sending (cron job)
- Email and SMS integration
- MongoDB for data storage

## Security

### Authentication

The API uses API Key authentication. Users receive an **API key** upon signup, which they can use for future authentication. API key is passed in the request headers.

```sh
const authHeader = req.header("Authorization");

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "API key is required" });
}
```

The API key is sent in the **authorization** header using the **Bearer** scheme.

Example request:

```sh
GET /users/all
Authorization: Bearer YOUR_API_KEY
```

### Authorization

The API uses **role-based authorization**, ensuring only authorized users can access certain features.

## Project Structure

- `server.js` – Main server entry point
- `config/db.js` – MongoDB connection
- `models/` – Mongoose models (`User`, `ApiUser`)
- `controllers/` – Route controllers
- `middleware/` – API key authentication & role authorization
- `routes/` – Express route definitions
- `cron/birthdayCron.js` – Birthday message scheduler
- `services/` – Email and SMS sending logic

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance

### Installation

```sh
git clone https://github.com/sureshcstha/birthday-message-app.git
cd birthday-message-app
npm install
```

### Environment Variables

Create a `.env` file:

```
MONGO_URI=<your-mongodb-uri>
EMAIL_USER=<your_email@example.com>
EMAIL_PASS=<your_google_app_password>
TWILIO_SID=<your-twilio-SID>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-phone-number>
SENDER_NAME=<your-name>
SENDER_PHONE=<your-phone>
SENDER_EMAIL=<your-email>
APP_URL=<your_api_base_url>
REDIRECT_URL=<https://birthdaymails.netlify.app>
RECAPTCHA_SECRET_KEY=<your_recaptcha_secret_key>
ALLOWED_ORIGINS=<http://localhost:5173,http://yourfrontend.com>
```

### Running the App

```sh
npm start
```

## API Overview

- **User Routes & Their Functions:** 

| **SN** | **Method** | **Endpoint** | **Function** | **Auth Required** | **Role Required** |
| --- | --- | --- | --- | --- | --- |
| 1 | POST | `/users/add` | Add a user with first name, last name, email, birthday, email, phone | Yes | admin, superadmin |
| 2 | PUT | `/users/update/:id` | Update user details | Yes | superadmin |
| 3 | DELETE | `/users/delete/:id` | Remove a user | Yes | superadmin |
| 4 | GET | `/users/all` | Retrieve all users | Yes | superadmin |
| 5 | PUT | `/users/subscribe/:id` | Subscribe user to email and SMS | Yes | admin, superadmin |
| 6 | PUT | `/users/unsubscribe/:id` |  Unsubscribe user from email and SMS  | Yes | admin, superadmin |
| 7 | GET | `/users/unsubscribe/:id` |  Allows users to unsubscribe (used for email unsubscribe actions)  | No | Public |

- **API Auth Routes & Their Functions:** 

| **SN** | **Method** | **Endpoint** | **Function** |
| --- | --- | --- | --- |
| 1 | POST | `/api/auth/signup` | Signup API user  |
| 2 | POST | `/api/auth/login` | Login API user | 
| 3 | PUT | `/api/auth/change-password` | Change API user password | 
| 4 | PUT | `/api/auth/regenerate-key` | Regenerate API key | 
| 5 | POST | `/api/auth/get-key` | Retrieve API key | 
| 6 | PUT | `/api/auth/delete` |  Delete API key  | 

- **Birthday Cron:** `/run-birthday-check` (manual trigger)

All protected routes require a valid API key in the `Authorization: Bearer <apiKey>` header.

## Technologies

- **Backend**: Node.js, Express, MongoDB

- **Frontend**: React, Tailwind CSS

- **Automation**: Cron jobs via GitHub Actions

- **Messaging**: Emails via Nodemailer, and SMS via Twilio

## Author
Developed by Suresh Shrestha — feel free to reach out at sureshshr91@gmail.com