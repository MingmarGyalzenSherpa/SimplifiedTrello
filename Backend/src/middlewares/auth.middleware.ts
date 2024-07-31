import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { errorMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser } from "../interfaces/IUser";
import { Roles } from "../constants/Roles";
import { WorkspaceModel } from "../models/workspace";
import { ForbiddenError } from "../errors/ForbiddenError";

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

export const workspaceAuthorization =
  (role: Roles) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    try {
      //get id of user
      const { id } = req.user!;
      //get id of workspace
      const { workspaceId } = req.params;

      //get role of user id with workspace id
      console.log(id);
      console.log(workspaceId);
      const roleInDb = await WorkspaceModel.getUserRoleInWorkspace(
        id!,
        +workspaceId
      );

      if (roleInDb !== role) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

const hasAccess = (role: string) => {};
