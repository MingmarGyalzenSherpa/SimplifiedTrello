import { ICard } from "../interfaces/ICard";
import { BaseModel } from "./base";

export class CardModel extends BaseModel {
  /**
   * Create a card
   * @param cardDetails - new card details
   */
  static createCard = async (cardDetails: ICard) => {
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

  static deleteCardById = async (cardId: number) => {
    await this.queryBuilder()
      .table("cards")
      .update({ deleted: true })
      .where({ id: cardId });

    //delete card_members
    await this.queryBuilder().table("card_members").delete().where({ cardId });
  };

  static getCardsOfUser = async (userId: number) => {
    const data = await this.queryBuilder()
      .table("card_members")
      .where({ userId });

    return data;
  };

  static addUserToCard = async (cardId: number, userId: number) => {
    await this.queryBuilder().table("card_members").insert({ cardId, userId });
  };

  static getCardById = async (cardId: number) => {
    return await this.queryBuilder()
      .table("cards")
      .where({ id: cardId })
      .first();
  };
}
