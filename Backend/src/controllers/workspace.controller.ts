import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as WorkspaceServices from "../services/workspaceService";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
import * as BoardServices from "../services/boardServices";
import * as UserServices from "../services/userServices";

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
    const { workspaceId } = req.params;
    const { body } = req;
    await WorkspaceServices.createBoard(userId!, +workspaceId, body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "Board" }),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get boards by workspace id
 * @param req
 * @param res
 * @param next
 */
export const getBoardByWorkspaceId = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;
    const boards = await BoardServices.getBoardsByWorkspaceId(+workspaceId);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Boards" }),
      data: boards,
    });
  } catch (error) {
    next(error);
  }
};

export const addUserToWorkspace = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;
    console.log(email);

    await WorkspaceServices.addUserToWorkspace(+workspaceId, email);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.ADDED, { item: "User" }),
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersInWorkspace = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;
    const data = await WorkspaceServices.getUsersInWorkspace(+workspaceId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, {
        item: "Users in workspace",
      }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUsersInWorkspace = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;
    console.log(workspaceId);
    const { query } = req;
    const { id: userId } = req.user!;
    const data = await UserServices.searchUsers(query, userId!, workspaceId);
    console.log("hereeee");
    console.log(data);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};
