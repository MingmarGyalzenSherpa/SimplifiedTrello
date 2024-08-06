import { ListModel } from "../models/list";
import { IList } from "../interfaces/IList";
import { NotFoundError } from "../errors/NotFoundError";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";

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

export const deleteList = async (listId: number) => {
  //get the list

  const toBeDeletedList = await ListModel.getListById(listId);

  if (!toBeDeletedList) {
    throw new NotFoundError(
      interpolate(errorMessages.NOTFOUND, { item: "List" })
    );
  }

  //get the lists in the board
  const listInBoard = await ListModel.getLists(toBeDeletedList.boardId);

  //filter lists with position greater than to be deleted list
  const filteredLists = listInBoard.filter(
    (list) => list.position > toBeDeletedList.position
  );

  //decrease position of each list by 1
  await Promise.all(
    filteredLists.map(async (list) => {
      await ListModel.updateList(list.id, {
        ...list,
        position: +list.position - 1,
      });
    })
  );

  await ListModel.deleteList(listId);
};

/**
 * Get count of cards in a list
 *
 * @param listId - id of the list
 */
export const getCardsCountInList = async (listId: number) => {
  return await ListModel.getCardsCountInList(listId);
};
