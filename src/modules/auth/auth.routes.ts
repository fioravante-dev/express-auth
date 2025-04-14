import { Router } from "express";

import AuthController from "./auth.controller";
import { validateSchema } from "../../core/middlewares/validateSchema";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "./types/authSchema";

const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  validateSchema(registerSchema),
  AuthController.register
);
authRoutes.post(
  "/auth/login",
  validateSchema(loginSchema),
  AuthController.login
);
authRoutes.post(
  "/auth/refresh",
  validateSchema(refreshTokenSchema),
  AuthController.refresh
);
authRoutes.post(
  "/auth/logout",
  validateSchema(refreshTokenSchema),
  AuthController.logout
);

export default authRoutes;
