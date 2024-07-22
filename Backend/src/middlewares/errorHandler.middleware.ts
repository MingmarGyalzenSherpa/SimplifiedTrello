import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
export const genericErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    
  });
};
