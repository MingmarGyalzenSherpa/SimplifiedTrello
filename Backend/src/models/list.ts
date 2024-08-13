import { IList } from "../interfaces/IList";
import { BaseModel } from "./base";

export class ListModel extends BaseModel {
  /**
   * Create a new list
   * @param listDetails - details of new list
   * @returns {Promise<IList>} - promise resolving created list details
   */
  static createList = async (listDetails: IList): Promise<IList> => {
    const [data] = await this.queryBuilder()
      .table("lists")
      .insert(listDetails)
      .returning("*");
    const createdList: IList = {
      id: data.id,
      title: data.title,
      position: data.position,
      boardId: data.boardId,
    };
    return createdList;
  };

  /**
   * Get lists
   * @param boardId - board id
   */
  static getLists = async (boardId: number) => {
    const data = await this.queryBuilder()
      .table("lists")
      .select("id", "title", "position")
      .where({ boardId, deleted: false });

    return data;
  };

  /**
   * Get list by id
   *
   * @param listId - id of the list
   */
  static getListById = async (listId: number) => {
    const data = await this.queryBuilder()
      .table("lists")
      .where({ id: listId })
      .first();
    return data;
  };

  static updateList = async (listId: number, updatedList: IList) => {
    await this.queryBuilder()
      .table("lists")
      .update(updatedList)
      .where({ id: listId });
  };

  static deleteList = async (listId: number) => {
    await this.queryBuilder()
      .table("lists")
      .update({ deleted: true })
      .where({ id: listId });
  };

  static getCardsCountInList = async (listId: number) => {
    return await this.queryBuilder()
      .table("cards")
      .where({ listId, deleted: false })
      .count("id");
  };
}
