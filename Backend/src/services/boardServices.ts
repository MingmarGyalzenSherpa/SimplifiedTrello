import { IBoard } from "../interfaces/IBoard";
import { BoardModel } from "../models/board";

/**
 * Get boards by a user
 *
 * @param boardId - id of the board
 * @returns {Promise<IBoard[]>} - users in the board
 */
export const getBoardsByUser = async (userId: number): Promise<IBoard[]> => {
  const data = await BoardModel.getBoardsByUser(userId);
  return data;
};
