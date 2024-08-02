import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

export const getWorkspaces = () =>
  axiosInstance.get(Endpoints.WORKSPACE.GET_WORKSPACES);

export const getWorkspaceById = (workspaceId: number) =>
  axiosInstance.get(
    interpolate(Endpoints.WORKSPACE.GET_WORKSPACE_BY_ID, { workspaceId })
  );

export const addUserToWorkspace = (workspaceId: number, email: string) =>
  axiosInstance.post(
    interpolate(Endpoints.WORKSPACE.ADD_USER_TO_WORKSPACE, { workspaceId }),
    { email }
  );
