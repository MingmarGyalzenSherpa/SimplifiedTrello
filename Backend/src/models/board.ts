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
    console.log(data);
    return data;
  };

  static getBoardById = async (boardId: number) => {
    return await this.queryBuilder()
      .table("boards")
      .where({ id: boardId })
      .first();
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

  /**
   * Update board
   *
   * @param boardId - board id
   * @param updatedBoard - updated board details
   */
  static updateBoard = async (boardId: number, updatedBoard: IBoard) => {
    await this.queryBuilder()
      .table("boards")
      .update(updatedBoard)
      .where({ boardId });
  };

  /**
   * Get labels by board
   * @param userId - id of user
   * @param boardId - id of board
   * @returns {Promise<boolean>}
   */
  static checkIfAdmin = async (userId: number, boardId: number) => {
    const data = await this.queryBuilder()
      .table("board_members")
      .where({ userId, boardId })
      .first();

    if (!data || data.role != Roles.ADMIN) return false;

    return true;
  };

  /**
   * Get labels by board
   *
   * @param boardId - board id
   * @returns
   */
  static getLabelsByBoard = async (boardId: number) => {
    const data = await this.queryBuilder().table("labels").where({ boardId });
    return data;
  };
}
