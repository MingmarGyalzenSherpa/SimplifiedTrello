import { Endpoints } from "../constants/Endpoints";
import { IBoard } from "../interfaces/IBoard";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Create a board
 *
 * @param workspaceId - id of workspace
 * @param boardDetails - details of the board
 * @returns
 */
export const createBoard = (
  workspaceId: number,
  boardDetails: { title: string; background?: string }
) =>
  axiosInstance.post(
    interpolate(Endpoints.BOARD.CREATE_BOARD, { workspaceId }),
    boardDetails
  );

/**
 * Get board by workspace id
 *
 * @param workspaceId - id of workspace
 * @returns
 */
export const getBoardsByWorkspaceId = (workspaceId: number) =>
  axiosInstance.get(
    interpolate(Endpoints.BOARD.GET_BOARDS_BY_WORKSPACE_ID, { workspaceId })
  );

/**
 * Get board by id
 *
 * @param boardId - board id
 * @returns
 */
export const getBoardById = (boardId: number) =>
  axiosInstance.get(interpolate(Endpoints.BOARD.GET_BOARD_BY_ID, { boardId }));

/**
 *Update a board
 *
 * @param boardId - id of the board
 * @param boardDetail - board details
 * @returns
 */
export const updateBoard = (
  boardId: number,
  boardDetail: Pick<IBoard, "title">
) =>
  axiosInstance.put(
    interpolate(Endpoints.BOARD.UPDATE_BOARD, { boardId }),
    boardDetail
  );

/**
 * Delete a board
 *
 * @param boardId - id of the board
 * @returns
 */
export const deleteBoard = (boardId: number) =>
  axiosInstance.delete(interpolate(Endpoints.BOARD.DELETE_BOARD, { boardId }));
