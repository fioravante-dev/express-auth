# ExpressAuth

RESTful API for authentication developed with Node.js, Express, Prisma, and Zod.  
Follows a modular and secure architecture using `access_token` and `refresh_token` with JWT.

Repository: [fioravante-dev/express-auth](https://github.com/fioravante-dev/express-auth)

---

## ⚙️ Technologies Used

- Node.js + Express
- TypeScript
- Prisma ORM
- Zod (schema validation)
- JSON Web Token (JWT)
- tsyringe (Dependency Injection)
- Vitest
- Docker

---

## 🚀 How to Run the Project Locally

```bash
# Install dependencies
npm install

# Configure the database
npx prisma migrate dev --name init

# Run the server
npm run dev
```

OR run the entire API using Docker:

```bash
docker-compose up
```

## 📦 Environment Variables (.env)

Create a `.env` file at the root of the project with the following content:

```env
DATABASE_URL=your-db-url
PORT=a-port # default 3333
JWT_ACCESS_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
```

---

## 🔐 Authentication Endpoints

### `POST /register`

Creates a new user.

**Body:**
```json
{
  "email": "user@email.com",
  "password": "123456",
  "name": "Test User"
}
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "is_verified": false
  },
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /login`

Authenticates a user.

**Body:**
```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "is_verified": false
  },
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /refresh`

Generates a new pair of tokens from a valid `refresh_token`.

**Body:**
```json
{
  "refresh_token": "..."
}
```

**Response:**
```json
{
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /logout`

Revokes the `refresh_token`.

**Body:**
```json
{
  "refresh_token": "..."
}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## ✅ Future Improvements

- Role-based authorization middleware (admin, user, etc.)
- Swagger/OpenAPI documentation
- More Automated tests with Jest or Vitest
- OAuth
- More routes
---

Made with dedication by Pedro Fioravante  
Project: **ExpressAuth**
