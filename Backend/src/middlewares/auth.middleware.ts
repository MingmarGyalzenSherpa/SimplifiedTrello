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
import { NotFoundError } from "../errors/NotFoundError";
import { interpolate } from "../utils/interpolate";

/**
 * Authentication for user
 *
 * @param req
 * @param res
 * @param next
 */
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

/**
 * Authorization for workspace
 * @param roles - roles in workspace
 * @returns
 */
export const workspaceAuthorization =
  (roles: Roles[]) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    try {
      //get id of user
      const { id } = req.user!;
      //get id of workspace
      const { workspaceId } = req.params;

      //get role of user id with workspace id
      const roleInWorkspace = await WorkspaceModel.getUserRoleInWorkspace(
        id!,
        +workspaceId
      );

      //check if workspace exists
      if (!roleInWorkspace) {
        throw new NotFoundError(
          interpolate(errorMessages.NOTFOUND, { item: "Workspace " })
        );
      }

      //if role doesn't exist
      if (!roles.includes(roleInWorkspace.role)) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

/**
 * Authorization middleware for boards
 * @param roles - roles of user
 * @returns
 */
export const boardAuthorization =
  (roles: Roles[]) =>
  async (req: IExpressRequest, res: Response, next: NextFunction) => {
    try {
      //get id of user
      const { id: userId } = req.user!;
      //get id of board
      const { boardId } = req.params;

      //board detail
      const boardDetail = await BoardModel.getBoardById(+boardId);

      if (!boardDetail) {
        throw new NotFoundError(
          interpolate(errorMessages.NOTFOUND, { item: "Board " })
        );
      }

      //get role in workspace
      const roleInWorkspace = await WorkspaceModel.getUserRoleInWorkspace(
        userId!,
        boardDetail.workspaceId
      );

      if (!roleInWorkspace) {
        throw new NotFoundError(
          interpolate(errorMessages.FORBIDDEN, { item: "Workspace " })
        );
      }

      //get role in board
      const roleInBoard = await BoardModel.getUserRoleInBoard(
        userId!,
        +boardId
      );

      console.log(roleInBoard);
      console.log(roleInWorkspace);

      if (
        !roles.includes(roleInBoard?.role) &&
        !roles.includes(roleInWorkspace?.role)
      ) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
