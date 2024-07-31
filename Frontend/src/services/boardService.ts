import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

// export const getBoardById = (boardId:number) => axiosInstance.get(interpolate(Endpoints.BOARD.))

export const createBoard = (
  workspaceId: number,
  boardDetails: { title: string; background?: string }
) =>
  axiosInstance.post(
    interpolate(Endpoints.BOARD.CREATE_BOARD, { workspaceId }),
    boardDetails
  );

export const getBoardsByWorkspaceId = (workspaceId: number) =>
  axiosInstance.get(
    interpolate(Endpoints.BOARD.GET_BOARDS_BY_WORKSPACE_ID, { workspaceId })
  );
