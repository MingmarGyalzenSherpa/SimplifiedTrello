import { Endpoints } from "../constants/Endpoints";
import { IList } from "../interfaces/IList";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

export const getLists = (boardId: number) => {
  return axiosInstance.get(interpolate(Endpoints.LIST.GET_LIST, { boardId }));
};

export const addList = (
  boardId: number,
  newList: Pick<IList, "position" | "title">
) =>
  axiosInstance.post(
    interpolate(Endpoints.LIST.CREATE_LIST, { boardId }),
    newList
  );

export const deleteList = (boardId: number, listId: number) =>
  axiosInstance.delete(
    interpolate(Endpoints.LIST.DELETE_LIST, { boardId, listId })
  );
