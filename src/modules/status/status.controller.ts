import { Request, Response } from "express";

export const getStatus = (req: Request, res: Response) => {
  const status = {
    status: "OK",
    message: "ExpressAuth is running",
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(status);
};
