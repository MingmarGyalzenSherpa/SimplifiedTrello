import { Roles } from "../constants/Roles";
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
    //create a workspace
    const data = await this.queryBuilder()
      .table("workspaces")
      .insert(workspaceToCreate)
      .returning("*"); //result comes in array

    const workspace = data[0];

    //add creator as admin to workspace

    await this.queryBuilder().table("workspace_members").insert({
      userId,
      workspaceId: workspace.id,
      role: Roles.ADMIN,
    });

    return workspace;
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

  /**
   *  Get workspace by id
   *
   * @param workspaceId - id of workspace
   * @returns {Promise<IWorkspace | undefined>}
   */
  static getWorkspaceById = async (
    workspaceId: number
  ): Promise<IWorkspace | undefined> => {
    const data = await this.queryBuilder()
      .table("workspaces")
      .where({ id: workspaceId })
      .first();

    return data;
  };

  /**
   * Check if admin of the workspace
   *
   * @param userId - id of the user
   * @param workspaceId - id of the workspace
   * @returns  - boolean
   */
  static checkIfAdmin = async (userId: number, workspaceId: number) => {
    const data = await this.queryBuilder()
      .table("workspace_members")
      .where({ userId, workspaceId })
      .first();

    if (!data || data.role != Roles.ADMIN) return false;

    return true;
  };
}
