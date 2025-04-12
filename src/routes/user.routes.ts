import { Router } from "express";

import UserController from "../controllers/user.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { registerSchema, loginSchema } from "../models/schemas/userSchema";

const userRoutes = Router();

userRoutes.post("/user/register",validateSchema(registerSchema), UserController.register);
userRoutes.post("/user/login", validateSchema(loginSchema), UserController.login);

export default userRoutes;
