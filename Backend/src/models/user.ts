import { IUser } from "../interfaces/user.interface";
import { createUser } from "./../services/userServices";
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
   * @returns {Promise<string | undefined>} - id if user is found or undefined
   */
  static getUserByEmail = async (email: string) => {
    const user = await this.queryBuilder()
      .table("users")
      .select("id")
      .where({ email })
      .first();

    return user;
  };
}
