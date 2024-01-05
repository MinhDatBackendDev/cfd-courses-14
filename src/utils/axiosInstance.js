import axios from "axios";
import { BASE_URL } from "../constants/environments";
import tokenMethod from "./token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error);
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.put("/customer/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data.data || {};

        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("error", error);
        tokenMethod.remove();
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
