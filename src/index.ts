import express from "express";

import userRoutes from "./routes/user.routes";
import statusRoutes from "./routes/status.routes";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(statusRoutes)

const PORT = process.env.PORT || 3333;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
