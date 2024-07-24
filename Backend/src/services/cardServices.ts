import { CardModel } from "../models/card";
import { ICard } from "./../interfaces/ICard";
export const createCard = async (listId: number, cardDetails: ICard) => {
  cardDetails.listId = listId;

  await CardModel.createCard(cardDetails);
};

export const getCards = async (listId: number) => {
  const data = await CardModel.getCards(listId);

  return data;
};

export const updateCard = async (cardId: number, cardDetails: ICard) => {
  await CardModel.updateCard(cardId, cardDetails);
};
