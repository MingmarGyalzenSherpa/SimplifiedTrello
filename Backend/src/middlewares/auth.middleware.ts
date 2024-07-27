import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { errorMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser } from "../interfaces/IUser";
import { Roles } from "../constants/Roles";
import { WorkspaceModel } from "../models/workspace";

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

export const authorization =
  (table: string, role: Roles) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    //get id of the table
    const { id: tableId } = req.params;

    //check if table is workspace or boards
  };
