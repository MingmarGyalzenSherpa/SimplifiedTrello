import { BadRequestError } from "./../errors/BadRequestError";
import { ForbiddenError } from "./../errors/ForbiddenError";
import { WorkspaceModel } from "../models/workspace";
import { IWorkspace } from "./../interfaces/IWorkspace";
import * as BoardServices from "../services/boardServices";
import { IBoard } from "../interfaces/IBoard";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";
import { Roles } from "../constants/Roles";
import { UserModel } from "../models/user";
import { NotFoundError } from "../errors/NotFoundError";
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
  userEmail: string
) => {
  //get user
  const users = await UserModel.getUsersByEmail(userEmail);

  //check if user exists
  if (users.length === 0) {
    throw new NotFoundError(
      interpolate(errorMessages.NOTFOUND, { item: "User" })
    );
  }

  //get the user
  const user = users[0];

  //check if user is already a member
  const usersInWorkspace = await WorkspaceModel.getUsersInWorkspace(
    workspaceId
  );
  const userExists = usersInWorkspace.some(
    (workspaceUser) => workspaceUser.id === user.id
  );

  if (userExists) {
    throw new BadRequestError(
      interpolate(errorMessages.EXISTS, { item: "User" })
    );
  }

  await WorkspaceModel.addUserToWorkspace(workspaceId, user.id!, Roles.MEMBER);
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
