import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { errorMessages } from "../utils/message";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";

export const notFound = (req: Request, res: Response) => {
  res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "NOT FOUND",
  });
};

export const genericErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestError) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: err.message,
    });
  }

  if (err instanceof ForbiddenError) {
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: err.message,
    });
  }

  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: errorMessages.INTERNAL_SERVER_ERROR,
  });
};
