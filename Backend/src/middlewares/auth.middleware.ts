import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { errorMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser } from "../interfaces/IUser";

export const authentication = (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED_ACCESS));
  }

  const token = authorization?.split(" ")!;

  if (token[0] != "Bearer" && token?.length != 2) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED_ACCESS));
  }
  let payload: IUser;
  try {
    payload = jwt.verify(token[1], config.jwt.secret!) as IUser;
    req.user = payload;
  } catch (error) {
    next(new UnauthorizedError(errorMessages.UNAUTHORIZED_ACCESS));
  }
  next();
};
