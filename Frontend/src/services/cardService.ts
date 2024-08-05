import { ICard } from "./../interfaces/ICard";
import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";
import axios from "axios";

export const getCards = (listId: number) => {
  return axiosInstance.get(
    interpolate(Endpoints.CARD.GET_CARDS_IN_LIST, { listId })
  );
};

export const addCard = (
  listId: number,
  reqBody: Pick<ICard, "title" | "position">
) =>
  axiosInstance.post(
    interpolate(Endpoints.CARD.CREATE_CARD, { listId }),
    reqBody
  );

export const updateCard = (
  cardId: number,
  reqBody: { title?: string; position?: number; description?: string }
) =>
  axiosInstance.put(
    interpolate(Endpoints.CARD.UPDATE_CARD, { cardId }),
    reqBody
  );

export const fetchCardsOfUser = () =>
  axiosInstance.get(Endpoints.CARD.GET_CARDS_OF_USER);

export const addUserToCard = (cardId: number, email: string) =>
  axiosInstance.post(interpolate(Endpoints.CARD.ADD_USER_TO_CARD, { cardId }), {
    email,
  });

export const removeUserFromCard = (cardId: number, userId: number) =>
  axiosInstance.delete(
    interpolate(Endpoints.CARD.REMOVE_USER_FROM_CARD, { cardId, userId })
  );
