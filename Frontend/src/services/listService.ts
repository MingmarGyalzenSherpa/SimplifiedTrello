import { Endpoints } from "../constants/Endpoints";
import { IList } from "../interfaces/IList";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Get lists
 *
 * @param boardId - id of the board
 * @returns
 */
export const getLists = (boardId: number) => {
  return axiosInstance.get(interpolate(Endpoints.LIST.GET_LIST, { boardId }));
};

/**
 * Add a list
 *
 * @param boardId - id of the board
 * @param newList - new list
 * @returns
 */
export const addList = (
  boardId: number,
  newList: Pick<IList, "position" | "title">
) =>
  axiosInstance.post(
    interpolate(Endpoints.LIST.CREATE_LIST, { boardId }),
    newList
  );

/**
 * Delete a list
 *
 * @param boardId - id of the board
 * @param listId - id of the list
 * @returns
 */
export const deleteList = (boardId: number, listId: number) =>
  axiosInstance.delete(
    interpolate(Endpoints.LIST.DELETE_LIST, { boardId, listId })
  );
