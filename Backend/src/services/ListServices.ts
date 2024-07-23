import { ListModel } from "../models/list";
import { IList } from "./../interfaces/IList";
export const createList = async (boardId: number, listDetails: IList) => {
  listDetails.boardId = boardId;

  await ListModel.createList(listDetails);
};
