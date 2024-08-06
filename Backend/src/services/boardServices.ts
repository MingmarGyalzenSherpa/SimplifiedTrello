import { NotFoundError } from "./../errors/NotFoundError";
import { IBoard } from "../interfaces/IBoard";
import { BoardModel } from "../models/board";
import * as WorkspaceServices from "./workspaceService";
import * as UserServices from "./userServices";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";
import { WorkspaceModel } from "../models/workspace";
import { ForbiddenError } from "../errors/ForbiddenError";
import { ListModel } from "../models/list";
import { CardModel } from "../models/card";

/**
 *  Create a new board
 * @param userId - id of user
 * @param workspaceId - workspace id
 * @param boardToCreate - new board details
 */
export const createBoard = async (
  userId: number,
  workspaceId: number,
  boardToCreate: IBoard
) => {
  const isValidWorkspace = await WorkspaceServices.getWorkspaceById(
    workspaceId
  );

  //check if user is admin

  if (!isValidWorkspace) {
    throw new NotFoundError(
      interpolate(errorMessages.DOES_NOT_EXIST, { item: "Workspace" })
    );
  }
  boardToCreate.workspaceId = workspaceId;
  await BoardModel.createBoard(userId, boardToCreate);
};

/**
 * Get boards by a user
 *
 * @param boardId - id of the board
 * @returns {Promise<IBoard[]>} - boards of a user
 */
export const getBoardsByUser = async (userId: number): Promise<IBoard[]> => {
  const data = await BoardModel.getBoardsByUser(userId);
  return data;
};

/**
 * Get boards by workspace
 * @param workspaceId - id of workspace
 * @returns {Promise<IBoard[]>} - boards of a user
 */
export const getBoardsByWorkspaceId = async (
  workspaceId: number
): Promise<IBoard[]> => {
  const data = await BoardModel.getBoardsByWorkspaceId(workspaceId);

  return data;
};

/**
 * Get a board by id
 *
 * @param boardId  - id of the board
 * @returns {Promise<IBoard | undefined>} - promise resolving in board or undefined
 */
export const getBoardById = async (
  boardId: number
): Promise<IBoard | undefined> => {
  const data = await BoardModel.getBoardById(boardId);
  return data;
};

/**
 * Delete a board by id
 *
 * @param boardId - board id
 */
export const deleteBoardById = async (boardId: number) => {
  // Get lists inside the board
  const lists = await ListModel.getLists(boardId);

  // Delete cards inside each list
  await Promise.all(
    lists.map(async (list) => {
      const cards = await CardModel.getCards(list.id);
      await Promise.all(cards.map((card) => CardModel.deleteCardById(card.id)));
      await ListModel.deleteList(list.id);
    })
  );

  // Delete the board
  await BoardModel.deleteBoardById(boardId);
};
/**
 * Get users by board
 * @param boardId - id of board
 * @returns
 */
export const getUsersByBoard = async (boardId: number) => {
  const data = await UserServices.getUsersByBoard(boardId);
  const filteredData = data.map(
    ({ id, username, firstName, lastName, email }) => {
      return { id, username, firstName, lastName, email };
    }
  );
  return filteredData;
};

/**
 * Update board
 * @param userId
 * @param boardId
 * @param updatedBoard
 */
export const updateBoard = async (
  userId: number,
  boardId: number,
  updatedBoard: IBoard
) => {
  await BoardModel.updateBoard(boardId, updatedBoard);
};

/**
 * Get labels by board
 *
 * @param boardId
 * @returns
 */
export const getLabelsByBoard = async (boardId: number) => {
  const data = await BoardModel.getLabelsByBoard(boardId);
  return data;
};
