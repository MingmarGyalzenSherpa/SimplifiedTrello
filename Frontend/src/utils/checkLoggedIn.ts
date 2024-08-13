import { HttpStatusCode } from "axios";
import { axiosInstance } from "./axiosConfig";

export const isLoggedIn = async () => {
  try {
    //get user
    const response = await axiosInstance.get("/auth/me");

    if (response.status === HttpStatusCode.Ok) {
      return { isLoggedIn: true, user: response.data };
    }
  } catch (error) {
    //get refresh token
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      //refresh
      const refreshResponse = await axiosInstance.post("/auth/refresh", {
        refreshToken,
      });
      if (refreshResponse.status === 200) {
        //set new tokens
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

        //get user
        const response = await axiosInstance.get("/auth/me");
        if (response.status === 200) {
          return { isLoggedIn: true, user: response.data };
        }
      }
    } catch (error) {
      return { isLoggedIn: false, user: undefined };
    }
  }
};
