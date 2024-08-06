import { CreateWorkspace } from "./../components/CreateWorkspace";
import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Get workspaces of a user
 *
 * @returns
 */
export const getWorkspaces = () =>
  axiosInstance.get(Endpoints.WORKSPACE.GET_WORKSPACES);

/**
 * Get a workspace by id
 *
 * @param workspaceId - workspace id
 * @returns
 */
export const getWorkspaceById = (workspaceId: number) =>
  axiosInstance.get(
    interpolate(Endpoints.WORKSPACE.GET_WORKSPACE_BY_ID, { workspaceId })
  );

/**
 * Add user to workspace
 *
 * @param workspaceId - id of the workspace
 * @param email - email of user
 * @returns
 */
export const addUserToWorkspace = (workspaceId: number, email: string) =>
  axiosInstance.post(
    interpolate(Endpoints.WORKSPACE.ADD_USER_TO_WORKSPACE, { workspaceId }),
    { email }
  );

/**
 * Get users in a workspace
 *
 * @param workspaceId - id of the workspace
 * @returns
 */
export const getUsersInWorkspace = (workspaceId: number) =>
  axiosInstance.get(
    interpolate(Endpoints.WORKSPACE.GET_USERS_IN_WORKSPACE, { workspaceId })
  );

/**
 *Search users in workspace

 * @param workspaceId - id of the workspace
 * @param email - email
 * @returns
 */
export const searchUsersInWorkspace = (workspaceId: number, email: string) =>
  axiosInstance.get(
    interpolate(Endpoints.WORKSPACE.SEARCH_USERS_IN_WORKSPACE, {
      workspaceId,
      email,
    })
  );

export const createWorkspace = (title: string) =>
  axiosInstance.post(Endpoints.WORKSPACE.CREATE_WORKSPACE, {
    title,
  });
