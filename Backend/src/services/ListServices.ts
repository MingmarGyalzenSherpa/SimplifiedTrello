import { ListModel } from "../models/list";
import { IList } from "../interfaces/IList";
export const createList = async (boardId: number, listDetails: IList) => {
  listDetails.boardId = boardId;

  await ListModel.createList(listDetails);
};

export const getLists = async (boardId: number) => {
  const data = await ListModel.getLists(boardId);

  return data;
};

export const updateList = async (listId: number, updatedList: IList) => {
  await ListModel.updateList(listId, updatedList);
};
