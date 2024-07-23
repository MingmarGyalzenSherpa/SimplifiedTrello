import { IUser } from "../interfaces/IUser";
import { IUserPayload } from "../interfaces/IUserPayload";
import { BaseModel } from "./base";

/**
 * User Model
 */
export class UserModel extends BaseModel {
  /**
   * Create a user
   *
   * @param user - user to be created
   */
  static createUser = async (user: IUser) => {
    const data = await this.queryBuilder().table("users").insert(user);
  };

  /**
   * Get user by email
   *
   * @param email - email of the user
   * @returns {Promise<IUserPayload | undefined>} - user found or undefined
   */
  static getUserByEmail = async (email: string): Promise<IUser | undefined> => {
    const user = await this.queryBuilder()
      .table("users")
      .select("id", "email", "username", "first_name", "last_name", "password")
      .where({ email })
      .first();

    return user as IUser;
  };

  /**
   * Get users by board
   *
   * @param boardId - id of board
   * @returns {Promise<IUser[] >} - users
   */
  static getUsersByBoard = async (boardId: number): Promise<IUser[]> => {
    const data = await this.queryBuilder()
      .table("board_members")
      .innerJoin("users", "board_members.user_id", "users.id")
      .select("users.*")
      .where("board_members.board_id", boardId);

    return data as IUser[];
  };
}
