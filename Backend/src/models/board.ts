import { Roles } from "../constants/Roles";
import { IBoard } from "../interfaces/IBoard";
import { BaseModel } from "./base";

export class BoardModel extends BaseModel {
  static createBoard = async (userId: number, boardToCreate: IBoard) => {
    //create a board
    const data = await this.queryBuilder()
      .table("boards")
      .insert(boardToCreate)
      .returning("*");

    const board = data[0];
    //assign user as a admin
    await this.queryBuilder().table("board_members").insert({
      userId,
      boardId: board.id, //doing create board
      role: Roles.ADMIN,
    });
  };

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
      .select("boards.*")
      .where("board_members.user_id", userId);
    console.log("heere");
    console.log(data);
    return data;
  };

  /**
   * Get boards by workspace
   *
   * @param workspaceId
   * @returns
   */
  static getBoardsByWorkspace = async (workspaceId: number) => {
    const data = await this.queryBuilder()
      .table("boards")
      .where({ workspaceId });

    return data;
  };
}
