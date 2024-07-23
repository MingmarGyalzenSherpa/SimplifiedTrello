import { IBoard } from "../interfaces/IBoard";
import { BoardModel } from "../models/board";

/**
 * Get boards by a user
 *
 * @param boardId - id of the board
 * @returns {Promise<IBoard[]>} - users in the board
 */
export const getBoards = async (userId: number): Promise<IBoard[]> => {
  const data = await BoardModel.getBoards(userId);
  return data;
};
