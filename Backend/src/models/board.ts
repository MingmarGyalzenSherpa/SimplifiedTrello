import { IBoard } from "../interfaces/IBoard";
import { BaseModel } from "./base";

export class BoardModel extends BaseModel {
  /**
   * Get users by board
   *
   * @param boardId - id of the board
   * @returns {Promise<IBoard[]>} - users in the board
   */
  static getBoardsByUser = async (userId: number): Promise<IBoard[]> => {
    const data = await this.queryBuilder()
      .table("boards")
      .innerJoin("board_members", "boards.id", "board_members.board_id")
      .where("board_members.user_id", userId);
    return data;
  };
}
