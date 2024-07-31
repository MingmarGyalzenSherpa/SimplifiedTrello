import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as WorkspaceServices from "../services/workspaceService";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

/**
 * Create a workspace
 *
 * @param req
 * @param res
 * @param next
 */
export const createWorkspace = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const { body } = req;

    const data = await WorkspaceServices.createWorkspace(userId!, body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "Workspace" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspacesByUser = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const data = await WorkspaceServices.getWorkspacesByUser(userId!);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Workspaces" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspacesById = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;
    const data = await WorkspaceServices.getWorkspaceById(+workspaceId);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Workspaces" }),
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Create a new board
 * @param req
 * @param res
 * @param next
 */
export const createBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const { id: workspaceId } = req.params;
    const { body } = req;
    await WorkspaceServices.createBoard(userId!, +workspaceId, body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "Board" }),
    });
  } catch (error) {
    next(error);
  }
};
