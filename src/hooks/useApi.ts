/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export async function handleApiCall(apiCall: any) {
  try {
    const response = await apiCall();
   if (!response.data || !response) return {}
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export function useApi() {
  const headers = {
    Accept: "Content-type",
    "Content-Type": "application/json",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      originalConfig.__retryCount = originalConfig.__retryCount || 0;
      // pour éviter boucle infinie du refreshToken
      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message === "jwt expired" &&
          originalConfig.__retryCount < 2
        ) {
          try {
            const options = {
              credentials: "include",
              withCredentials: true,
            };
            originalConfig.__retryCount += 1;
            const result = await api.get(
              `${import.meta.env.VITE_URL_AUTH}/refreshToken`,
              options
            );
            const { token } = result.data.data;
            localStorage.setItem("token", token);
            console.log("I just refreshed the token")
            return true;
          } catch (error) {
            console.error('Error refreshing token')
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return api;
}
