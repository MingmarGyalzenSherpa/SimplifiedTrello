import { Endpoints } from "../constants/Endpoints";
import { ILoginCredential } from "../interfaces/ILoginCredential";
import { axiosInstance } from "../utils/axiosConfig";
import { interpolate } from "../utils/interpolate";

export const login = (loginCredential: ILoginCredential) =>
  axiosInstance.post(interpolate(Endpoints.AUTH.LOGIN, {}), loginCredential);

export const Signup = (signupCredential: object) =>
  axiosInstance.post(interpolate(Endpoints.AUTH.SIGNUP, {}), signupCredential);
