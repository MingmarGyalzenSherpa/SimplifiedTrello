import { WorkspaceModel } from "../models/workspace";
import { IWorkspace } from "./../interfaces/IWorkspace";
import * as BoardServices from "../services/boardServices";
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

  //get boards of those workspaces

  for (let i = 0; i < workspaces.length; i++) {
    workspaces[i].boards = await BoardServices.getBoardsByWorkspace(
      workspaces[i].id
    );
  }

  return workspaces;
};
