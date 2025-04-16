import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, "refresh_token is required"),
});
