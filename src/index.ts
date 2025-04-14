import express from "express";

import authRoutes from "./modules/auth/auth.routes";
import statusRoutes from "./modules/status/status.routes";
import { snakeCaseResponseMiddleware } from "./core/middlewares/snakeCaseResponseMiddleware";

const app = express();
app.use(express.json());
app.use(snakeCaseResponseMiddleware);
app.use(authRoutes);
app.use(statusRoutes);

const PORT = process.env.PORT || 3333;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
