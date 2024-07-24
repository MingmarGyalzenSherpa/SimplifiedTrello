import { CardModel } from "../models/card";
import { ICard } from "./../interfaces/ICard";
export const createCard = async (listId: number, cardDetails: ICard) => {
  cardDetails.listId = listId;

  await CardModel.createCard(cardDetails);
};
