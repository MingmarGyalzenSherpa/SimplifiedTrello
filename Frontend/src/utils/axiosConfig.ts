import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import { config } from "../config";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: config.axios.baseUrl,
};

export const axiosInstance = axios.create(axiosConfig);

const requestInterceptor = (axiosConfig: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken} `;
  }

  return axiosConfig;
};

axiosInstance.interceptors.request.use(requestInterceptor);
