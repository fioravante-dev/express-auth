import { Router } from "express";
import { container } from "tsyringe";

import AuthController from "./auth.controller";
import { validateSchema } from "../../core/middlewares/validateSchema";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "./types/authSchemas";


const authController = container.resolve(AuthController);
const authRoutes = Router();

authRoutes.post(
  "/auth/register",
  validateSchema(registerSchema),
  authController.register
);
authRoutes.post(
  "/auth/login",
  validateSchema(loginSchema),
  authController.register
);
authRoutes.post(
  "/auth/refresh",
  validateSchema(refreshTokenSchema),
  authController.refresh
);
authRoutes.post(
  "/auth/logout",
  validateSchema(refreshTokenSchema),
  authController.logout
);

export default authRoutes;
