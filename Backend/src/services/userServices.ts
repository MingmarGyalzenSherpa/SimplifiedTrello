import { IGetRequestQuery } from "../interfaces/IGetRequestQuery";
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

/**
 * Get users
 * @param query - query filter
 * @returns {Promise< IUser[]>} - user array
 */
export const searchUsers = async (
  query: IGetRequestQuery,
  userId: number
): Promise<IUser[] | undefined> => {
  return await UserModel.searchUsers(query, userId);
};
