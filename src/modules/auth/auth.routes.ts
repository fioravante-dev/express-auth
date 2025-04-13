import { Router } from "express";

import AuthController from "./auth.controller";
import { validateSchema } from "../../core/middlewares/validateSchema";
import { registerSchema, loginSchema } from "./types/authSchema";

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

export default authRoutes;
