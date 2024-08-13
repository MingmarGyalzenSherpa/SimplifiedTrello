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
    const data = await this.queryBuilder()
      .table("cards")
      .where({ listId, deleted: false });

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
  };

  static getCardsOfUser = async (userId: number) => {
    const data = await this.queryBuilder()
      .table("card_members")
      .where({ userId });

    return data;
  };

  static getMemberInCard = async (cardId: number) => {
    return await this.queryBuilder()
      .table("card_members")
      .leftJoin("users", "users.id", "=", "card_members.user_id")
      .select("users.id", "users.email", "users.username")
      .where("card_members.cardId", "=", cardId);
  };

  static addUserToCard = async (cardId: number, userId: number) => {
    await this.queryBuilder()
      .table("card_members")
      .insert({ cardId, userId })
      .returning("*");
    return await this.queryBuilder()
      .table("card_members")
      .leftJoin("users", "users.id", "=", "card_members.user_id")
      .select("users.id", "users.email", "users.username")
      .where("card_members.cardId", "=", cardId)
      .andWhere("card_members.userId", "=", userId);
  };

  static removeUserFromCard = async (cardId: number, userId: number) => {
    await this.queryBuilder().table("card_members").delete().where({
      cardId,
      userId,
    });
  };

  static getCardById = async (cardId: number) => {
    return await this.queryBuilder()
      .table("cards")
      .where({ id: cardId })
      .first();
  };
}
