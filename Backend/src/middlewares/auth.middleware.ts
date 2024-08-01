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
import { BoardModel } from "../models/board";

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
  (roles: Roles[]) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    try {
      //get id of user
      const { id } = req.user!;
      //get id of workspace
      const { workspaceId } = req.params;

      //get role of user id with workspace id
      const roleInDb = await WorkspaceModel.getUserRoleInWorkspace(
        id!,
        +workspaceId
      );

      if (roles.includes(roleInDb)) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export const boardAuthorization =
  (roles: Roles[]) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    try {
      //get id of user
      const { id: userId } = req.user!;
      //get id of board
      const { boardId } = req.params;

      const roleInBoard = await BoardModel.getUserRoleInBoard(
        userId!,
        +boardId
      );

      //board detail
      const boardDetail = await BoardModel.getBoardById(+boardId);
      console.log(boardDetail);

      const roleInWorkspace = await WorkspaceModel.getUserRoleInWorkspace(
        userId!,
        boardDetail.workspaceId
      );

      console.log(roleInWorkspace);

      console.log("role = " + roleInBoard);

      if (!roles.includes(roleInBoard) && !roles.includes(roleInWorkspace)) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
