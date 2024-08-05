import { Endpoints } from "../constants/Endpoints";
import { IBoard } from "../interfaces/IBoard";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

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

export const getBoardById = (boardId: number) =>
  axiosInstance.get(interpolate(Endpoints.BOARD.GET_BOARD_BY_ID, { boardId }));

export const updateBoard = (
  boardId: number,
  boardDetail: Pick<IBoard, "title">
) =>
  axiosInstance.put(
    interpolate(Endpoints.BOARD.UPDATE_BOARD, { boardId }),
    boardDetail
  );

export const deleteBoard = (boardId: number) =>
  axiosInstance.delete(interpolate(Endpoints.BOARD.DELETE_BOARD, { boardId }));
