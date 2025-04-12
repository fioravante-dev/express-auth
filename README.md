# ExpressAuth

## 📋 Prerequisites

Make sure you have the following items installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Compatible database (e.g., MySQL, PostgreSQL, MongoDB, etc.)
- 
## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fioravante-dev/express-auth.git
   cd express-auth
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root of the project and add the necessary configurations, such as the database URL, port, etc.

   Example `.env` file:

   ```
   # Server configuration
   PORT=your-port

   # Database configuration
   DATABASE_URL=your-database-url

   # Authentication
   JWT_SECRET=your-jwt-secret
   ```

4. Run the database migrations (if applicable):
   ```bash
   npm run migrate
   # or
   yarn migrate
   ```

## 🏃‍♂️ Running the Application

To start the server in development mode, use:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3333` (or the configured port).

## 📚 Endpoints

### **POST** `/register`
Registers a new user.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "createdAt": "2025-04-12T12:00:00.000Z"
}
```

---

### **POST** `/login`
Authenticates a user and returns a token.

#### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

#### Response:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1d"
}
```

---

### **GET** `/`
Returns a welcome message or basic API information.

#### Response:
```json
{
    "status": "OK",
    "message": "ExpressAuth is running",
    "timestamp": "2025-04-12T12:00:00.000Z",
}
```
## 🛠More endpoints on the way.🛠

## 🛠 Technologies Used

- Node.js
- Express
- Database (e.g., MySQL, PostgreSQL, MongoDB)
- Other relevant libraries and tools:
  - `bcrypt` for password hashing
  - `jsonwebtoken` for authentication
  - `zod` for schema validation
  - `prisma` for database management

## 🤝 Contribution

Contributions are welcome! Follow the steps below:

1. Fork the project.
2. Create a branch for your feature/bugfix:
   ```bash
   git checkout -b my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of my feature"
   ```
4. Push to the remote repository:
   ```bash
   git push origin my-feature
   ```
5. Open a Pull Request.

## 📄 License

This project is licensed under the [MIT](LICENSE) license.

---

Made with ❤️ by [fioravante-dev](https://github.com/fioravante-dev).
