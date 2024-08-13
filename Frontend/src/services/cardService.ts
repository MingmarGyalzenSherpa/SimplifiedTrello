import { ICard } from "./../interfaces/ICard";
import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Get cards in a list
 *
 * @param listId - id of the list
 * @returns
 */
export const getCards = (listId: number) => {
  return axiosInstance.get(
    interpolate(Endpoints.CARD.GET_CARDS_IN_LIST, { listId })
  );
};
/**
 * Add a card
 *
 * @param listId - id of the list
 * @param reqBody - details of the card
 * @returns
 */
export const addCard = (
  listId: number,
  reqBody: Pick<ICard, "title" | "position">
) =>
  axiosInstance.post(
    interpolate(Endpoints.CARD.CREATE_CARD, { listId }),
    reqBody
  );

/**
 * Update a card
 *
 * @param cardId - id of the card
 * @param reqBody  - details of the card
 * @returns
 */
export const updateCard = (
  cardId: number,
  reqBody: {
    title?: string;
    position?: number;
    description?: string;
    listId?: number;
  }
) =>
  axiosInstance.put(
    interpolate(Endpoints.CARD.UPDATE_CARD, { cardId }),
    reqBody
  );

/**
 * Fetch cards of a user
 * @returns
 */
export const fetchCardsOfUser = () =>
  axiosInstance.get(Endpoints.CARD.GET_CARDS_OF_USER);

/**
 *  Add users to card
 *
 * @param cardId - card id
 * @param email  - email of the user
 * @returns
 */
export const addUserToCard = (cardId: number, email: string) =>
  axiosInstance.post(interpolate(Endpoints.CARD.ADD_USER_TO_CARD, { cardId }), {
    email,
  });

/**
 * Remove user from board
 *
 * @param cardId - id of the card
 * @param userId - id of the user
 * @returns
 */
export const removeUserFromCard = (cardId: number, userId: number) =>
  axiosInstance.delete(
    interpolate(Endpoints.CARD.REMOVE_USER_FROM_CARD, { cardId, userId })
  );

/**
 * Delete a card
 *
 * @param cardId - id of the card
 * @returns
 */
export const deleteCard = (cardId: number) =>
  axiosInstance.delete(interpolate(Endpoints.CARD.DELETE_CARD, { cardId }));
