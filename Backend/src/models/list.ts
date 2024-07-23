import { IList } from "../interfaces/IList";
import { BaseModel } from "./base";

export class ListModel extends BaseModel {
  static createList = async (listDetails: IList) => {
    await this.queryBuilder().table("lists").insert(listDetails);
  };
}
