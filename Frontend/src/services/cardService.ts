import { Endpoints } from "../constants/Endpoints";
import { ICard } from "../interfaces/ICard";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

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
