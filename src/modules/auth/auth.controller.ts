import { Request, Response } from "express";

import AuthService from "./auth.service";

class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await AuthService.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  refresh = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    try {
      const result = await AuthService.refresh(refresh_token);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  logout = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    try {
      await AuthService.logout(refresh_token);
      res.status(204)
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default new AuthController();
