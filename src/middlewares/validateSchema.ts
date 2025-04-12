import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) : void => {
    // parse and validate the request body against the schema
    try {
      req.body = schema.parse(req.body);
      next(); // if validation is successful, call the next middleware
    } catch (error) {
      if (error instanceof ZodError) {
        // if validation fails, return a 400 response with the error message
        res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }
    }
  };
