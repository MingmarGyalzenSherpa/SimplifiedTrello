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
      .where("board_members.user_id", userId)
      .andWhere("boards.deleted", false);

    return data;
  };

  static getBoardById = async (boardId: number) => {
    return await this.queryBuilder()
      .table("boards")
      .where({ id: boardId, deleted: false })
      .first();
  };

  /**
   * Get boards by workspace
   *
   * @param workspaceId
   * @returns
   */
  static getBoardsByWorkspaceId = async (workspaceId: number) => {
    const data = await this.queryBuilder()
      .table("boards")
      .where({ workspaceId, deleted: false });

    return data;
  };

  /**
   * Get user role in board
   * @param userId
   * @param workspaceId
   * @returns
   */
  static getUserRoleInBoard = async (userId: number, boardId: number) => {
    const data = await this.queryBuilder()
      .table("board_members")
      .select("role")
      .where({ userId, boardId })
      .first();
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
      .where({ id: boardId });
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

  static deleteBoardById = async (boardId: number) => {
    await this.queryBuilder()
      .table("boards")
      .update({ deleted: true })
      .where({ id: boardId });
  };

  static getListCountInBoard = async (boardId: number) => {
    await this.queryBuilder()
      .table("lists")
      .where({ boardId, deleted: false })
      .count("id");
  };
}
