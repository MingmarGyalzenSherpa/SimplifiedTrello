import { ICard } from "../interfaces/ICard";
import { BaseModel } from "./base";

export class CardModel extends BaseModel {
  static createCard = async (cardDetails: ICard) => {
    await this.queryBuilder().table("cards").insert(cardDetails);
  };
}
