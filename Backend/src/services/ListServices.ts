import { ListModel } from "../models/list";
import { IList } from "../interfaces/IList";

/**
 * Create a new list
 * @param boardId - id of the board
 * @param listDetails - details of the list
 * @returns {Promise<IList>} - promise resolving new list details
 */
export const createList = async (boardId: number, listDetails: IList) => {
  listDetails.boardId = boardId;

  const data = await ListModel.createList(listDetails);
  return data as IList;
};

export const getLists = async (boardId: number) => {
  const data = await ListModel.getLists(boardId);

  return data;
};

export const updateList = async (listId: number, updatedList: IList) => {
  await ListModel.updateList(listId, updatedList);
};
