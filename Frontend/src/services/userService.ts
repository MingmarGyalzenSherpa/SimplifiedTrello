import { Endpoints } from "../constants/Endpoints";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Search a user
 *
 * @param email - email of the user
 * @returns
 */
export const searchUser = (email: string) =>
  axiosInstance.get(interpolate(Endpoints.USER.SEARCH_USER, { q: email }));
