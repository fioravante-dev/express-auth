import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import AuthService from "./auth.service";

@injectable()
export default class AuthController {
  constructor(
    @inject(AuthService) private authService: AuthService
  ) {}
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await this.authService.createUser({ name, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  refresh = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    try {
      const result = await this.authService.refresh(refresh_token);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  logout = async (req: Request, res: Response) => {
    const { refresh_token } = req.body;
    try {
      await this.authService.logout(refresh_token);
      res.status(204)
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  verifyEmail = async (req: Request, res: Response) => {}

  generateEmailVerification = async (req: Request, res: Response) => {}
}