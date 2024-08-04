import { errorMessages } from "./../utils/message";
import { interpolate } from "./../utils/interpolate";
import { NotFoundError } from "./../errors/NotFoundError";
import { BoardModel } from "../models/board";
import { CardModel } from "../models/card";
import { ListModel } from "../models/list";
import { UserModel } from "../models/user";
import { WorkspaceModel } from "../models/workspace";
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

export const getCardsOfUser = async (userId: number) => {
  // Get cards
  const cards = await CardModel.getCardsOfUser(userId);
  console.log(cards);

  // Use Promise.all to wait for all async operations to complete
  const updatedCards = await Promise.all(
    cards.map(async (card) => {
      // Get card details
      const cardDetail = await CardModel.getCardById(card.cardId);

      if (!cardDetail) return {};

      // Get list of the card
      const list = await ListModel.getListById(cardDetail.listId);

      // Get board of the list
      const board = await BoardModel.getBoardById(list.boardId);

      // Get workspace the board is in
      const workspace = await WorkspaceModel.getWorkspaceById(
        board.workspaceId
      );

      // Return a new object with additional properties
      return {
        ...card,
        title: cardDetail.title,
        boardId: board.id,
        boardTitle: board.title,
        workspaceTitle: workspace?.title,
      };
    })
  );

  return updatedCards;
};

export const addUserToCard = async (cardId: number, email: string) => {
  //find user
  const users = await UserModel.getUsersByEmail(email);
  if (users.length === 0) {
    throw new NotFoundError(
      interpolate(errorMessages.DOES_NOT_EXIST, { item: "User" })
    );
  }

  await CardModel.addUserToCard(cardId, users[0].id!);
};
