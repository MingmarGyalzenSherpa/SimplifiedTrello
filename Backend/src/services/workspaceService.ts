import { ForbiddenError } from "./../errors/ForbiddenError";
import { WorkspaceModel } from "../models/workspace";
import { IWorkspace } from "./../interfaces/IWorkspace";
import * as BoardServices from "../services/boardServices";
import { IBoard } from "../interfaces/IBoard";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";
import { Roles } from "../constants/Roles";
/**
 * Create a new workspace
 *
 * @param userId - id of the user
 * @param workspaceToCreate - new workspace details
 */
export const createWorkspace = async (
  userId: number,
  workspaceToUpdate: IWorkspace
) => {
  const data = await WorkspaceModel.createWorkspace(userId, workspaceToUpdate);

  return data;
};

export const getWorkspacesByUser = async (userId: number) => {
  //get workspaces
  const workspaces = await WorkspaceModel.getWorkspaceByUser(userId);

  return workspaces;
};

/**
 *  Get workspace by id
 *
 * @param workspaceId - id of workspace
 * @returns {Promise<IWorkspace | undefined>}
 */
export const getWorkspaceById = async (
  workspaceId: number
): Promise<IWorkspace | undefined> => {
  const workspace = await WorkspaceModel.getWorkspaceById(workspaceId);
  return workspace;
};

/**
 * Create a new board
 *
 * @param userId - id of user
 * @param workspaceId - id of workspace
 * @param boardToCreate - details of new board
 */
export const createBoard = async (
  userId: number,
  workspaceId: number,
  boardToCreate: IBoard
) => {
  await BoardServices.createBoard(userId, workspaceId, boardToCreate);
};

export const addUserToWorkspace = async (
  workspaceId: number,
  userId: number
) => {
  await WorkspaceModel.addUserToWorkspace(workspaceId, userId, Roles.MEMBER);
};
