import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

export const getLists = (listId: number) => {
  return axiosInstance.get(
    interpolate(Endpoints.CARD.GET_CARDS_IN_LIST, { listId })
  );
};

// export const addCard = (listId:number,reqBody)
