import { IBoard } from "../interfaces/IBoard";
import { BoardModel } from "../models/board";

/**
 * Get boards by a user
 *
 * @param boardId - id of the board
 * @returns {Promise<IBoard[]>} - boards of a user
 */
export const getBoardsByUser = async (userId: number): Promise<IBoard[]> => {
  const data = await BoardModel.getBoardsByUser(userId);
  return data;
};

/**
 * Get boards by workspace
 * @param workspaceId - id of workspace
 * @returns {Promise<IBoard[]>} - boards of a user
 */
export const getBoardsByWorkspace = async (
  workspaceId: number
): Promise<IBoard[]> => {
  const data = await BoardModel.getBoardsByWorkspace(workspaceId);

  return data;
};
