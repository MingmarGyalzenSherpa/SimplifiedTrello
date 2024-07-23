import { IUser } from "../interfaces/IUser";
import { UserModel } from "../models/user";

/**
 * Get users by board
 * @param boardId - id of board
 * @returns {Promise<IUser[]>} - users
 */
export const getUsersByBoard = async (boardId: number): Promise<IUser[]> => {
  const data = await UserModel.getUsersByBoard(boardId);

  return data;
};
