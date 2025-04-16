import { Response, Request, NextFunction } from "express";

import { camelToSnakeObject } from "../libs/utils/utils";

export function snakeCaseResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (data: any) {
    const snakeCaseData = camelToSnakeObject(data);
    return originalJson.call(this, snakeCaseData);
  };

  next();
}
