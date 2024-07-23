import { WorkspaceModel } from "../models/workspace";
import { IWorkspace } from "./../interfaces/IWorkspace";

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
  await WorkspaceModel.createWorkspace(userId, workspaceToUpdate);
};
