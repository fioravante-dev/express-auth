import express from "express";

import authRoutes from "./modules/auth/auth.routes";
import statusRoutes from "./modules/status/status.routes";

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(statusRoutes);

const PORT = process.env.PORT || 3333;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
