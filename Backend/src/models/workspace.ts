import { IWorkspace } from "../interfaces/IWorkspace";
import { BaseModel } from "./base";

export class WorkspaceModel extends BaseModel {
  /**
   * Create a new workspace
   *
   * @param userId - id of the user
   * @param workspaceToCreate - new workspace details
   */
  static createWorkspace = async (
    userId: number,
    workspaceToCreate: IWorkspace
  ) => {
    const data = await this.queryBuilder()
      .insert(workspaceToCreate)
      .returning("*");
    console.log(data);
  };

  /**
   *  Get workspaces of a user
   *
   * @param userId - id of the user
   * @returns {Promise<IWorkspace[]>}  - workspaces of a user
   */
  static getWorkspaceByUser = async (userId: number): Promise<IWorkspace[]> => {
    const data = await this.queryBuilder()
      .table("workspace_members")
      .innerJoin(
        "workspaces",
        "workspace_members.workspace_id",
        "workspaces.id"
      )
      .select("workspaces.id", "workspaces.title", "workspaces.created_at")
      .where("workspace_members.user_id", userId);

    return data as IWorkspace[];
  };
}
