import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/errors/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`Error occurred: ${err.message}`);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      details: err.details || null,
    });
    return;
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
    return;
  }
};
