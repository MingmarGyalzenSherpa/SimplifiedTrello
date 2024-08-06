import { CardModel } from "./../models/card";
import { errorMessages } from "./../utils/message";
import { interpolate } from "./../utils/interpolate";
import { NotFoundError } from "./../errors/NotFoundError";
import { BoardModel } from "../models/board";
import { ListModel } from "../models/list";
import { UserModel } from "../models/user";
import { WorkspaceModel } from "../models/workspace";
import { ICard } from "./../interfaces/ICard";
export const createCard = async (listId: number, cardDetails: ICard) => {
  cardDetails.listId = listId;

  await CardModel.createCard(cardDetails);
};

export const getCards = async (listId: number) => {
  // Get cards
  const cards = await CardModel.getCards(listId);
  // Get members for each card
  const cardsWithMembers = await Promise.all(
    cards.map(async (card) => {
      const members = await CardModel.getMemberInCard(card.id);
      console.log(members);

      return { ...card, members };
    })
  );

  return cardsWithMembers;
};

export const updateCard = async (cardId: number, cardDetails: ICard) => {
  console.log(cardDetails);
  //check if position exists
  if (!cardDetails.position) {
    //if it doesn't perform normal operation and return

    await CardModel.updateCard(cardId, cardDetails);
    return;
  }

  // if it does
  const card = await CardModel.getCardById(cardId);
  //get all the cards in the list
  const cardsInList = await CardModel.getCards(card.listId);

  const filteredCards = cardsInList.filter(
    (card) => card.position >= cardDetails.position!
  );

  //filter card with position >= new position

  await Promise.all(
    filteredCards.map(async (card) => {
      await CardModel.updateCard(card.id, {
        ...card,
        position: +card.position! + 1,
      });
    })
  );
  //increase each by 1
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

  const data = await CardModel.addUserToCard(cardId, users[0].id!);
  return data;
};

export const removeUserFromCard = async (cardId: number, userId: number) => {
  await CardModel.removeUserFromCard(cardId, userId);
};

export const deleteCardById = async (cardId: number) => {
  //get the card
  const toBeDeletedCard = await CardModel.getCardById(cardId);

  //get its list id
  if (!toBeDeletedCard) {
    throw new NotFoundError(
      interpolate(errorMessages.NOTFOUND, { item: "Card" })
    );
  }

  //get the  cards in the list
  const cardsInList = await CardModel.getCards(toBeDeletedCard.listId);

  //filter cards with position greater than to be deleted card
  const filteredCards = cardsInList.filter(
    (card) => card.position > toBeDeletedCard.position
  );

  //decrease position of each card by 1
  await Promise.all(
    filteredCards.map(async (card) => {
      await CardModel.updateCard(card.id, {
        ...card,
        position: +card.position - 1,
      });
    })
  );
  await CardModel.deleteCardById(cardId);
};
