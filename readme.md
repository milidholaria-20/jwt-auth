# JWT-based Authentication System (Node.js Assignment)

This project implements a simple authentication system using JWT in Node.js.  
It provides three routes — `/register`, `/login`, and `/invoke` — which are tested using browser URLs with query parameters.

Users are stored in-memory, passwords are hashed with bcrypt, and JWT tokens expire in 10 minutes.

---

##  Requirements

Install the dependencies:

```bash
npm install express bcrypt jsonwebtoken dotenv
```

Create a `.env` file in the project folder with:

```
JWT_SECRET=your_secret_key_here
PORT=3000
```

---

##  How to Run

Start the server:

```bash
node server.js
```

The server will run at:

```
http://localhost:3000
```

---

##  How to Test (Using Browser URLs)

### 1️ Register a User
```
http://localhost:3000/register?email=test@gmail.com&password=123
```

### 2️ Login and Get JWT Token
```
http://localhost:3000/login?email=test@gmail.com&password=123
```

Copy the returned JWT token.

### 3️ Access the Protected Route
```
http://localhost:3000/invoke?token=PASTE_TOKEN_HERE
```

---

##  Project Structure

```
server.js
.env
README.md
```

---

## Notes

- JWT expires in **10 minutes** as required.  
- Users are stored in-memory, so restarting the server clears all user data.  
- All testing is done through the browser — no Postman required.  
- `.env` file is required to store the JWT secret.
