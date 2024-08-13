import { Endpoints } from "../constants/Endpoints";
import { ILoginCredential } from "../interfaces/ILoginCredential";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

/**
 * Login a user
 * @param loginCredential - login credentials
 * @returns
 */
export const login = (loginCredential: ILoginCredential) =>
  axiosInstance.post(interpolate(Endpoints.AUTH.LOGIN, {}), loginCredential);

/**
 * Signup a user
 * @param signupCredential - signup credential
 * @returns
 */
export const signup = (signupCredential: object) =>
  axiosInstance.post(interpolate(Endpoints.AUTH.SIGNUP, {}), signupCredential);
