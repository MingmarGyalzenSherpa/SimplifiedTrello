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

/**
 * Add user to workspace
 *
 * @param workspaceId - workspace id
 * @param userId - user id
 */
export const addUserToWorkspace = async (
  workspaceId: number,
  userId: number
) => {
  //check if user is already a member

  await WorkspaceModel.addUserToWorkspace(workspaceId, userId, Roles.MEMBER);
};

/**
 * Get users in a workspace
 *
 * @param workspaceId - workspace id
 * @returns
 */
export const getUsersInWorkspace = async (workspaceId: number) => {
  const data = await WorkspaceModel.getUsersInWorkspace(workspaceId);
  return data;
};
