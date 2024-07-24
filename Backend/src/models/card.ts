import { ICard } from "../interfaces/ICard";
import { BaseModel } from "./base";

export class CardModel extends BaseModel {
  /**
   * Create a card
   * @param cardDetails - new card details
   */
  static createCard = async (cardDetails: ICard) => {
    console.log(cardDetails);
    await this.queryBuilder().table("cards").insert(cardDetails);
  };

  /**
   * Get cards
   *
   * @param listId - list id
   * @returns - cards in the list
   */
  static getCards = async (listId: number) => {
    const data = await this.queryBuilder().table("cards").where({ listId });

    return data;
  };

  static updateCard = async (cardId: number, updatedCard: ICard) => {
    await this.queryBuilder()
      .table("cards")
      .update(updatedCard)
      .where({ id: cardId });
  };
}
