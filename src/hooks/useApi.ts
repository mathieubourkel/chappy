/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export async function handleApiCall(apiCall: any) {
  try {
    const response = await apiCall();
    if (!response.data || !response) return {};
    return response.data.data;
  } catch (error) {
    return error;
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

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

  const subscribeToTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  };

  const processRefreshSubscribers = (token: string) => {
    refreshSubscribers.forEach((callback) => {
      callback(token);
    });
    refreshSubscribers = [];
  };

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message === "jwt expired"
        ) {
          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const options = {
                credentials: "include",
                withCredentials: true,
              };
              const result = await axios.get(
                `${import.meta.env.VITE_URL_AUTH}/refreshToken`,
                options
              );
              const { token } = result.data.data;
              localStorage.setItem("token", token);
              console.log("I just refreshed the token");

              processRefreshSubscribers(token);

              return api(originalConfig);
            } catch (error) {
              console.error('Error refreshing token', error);
              localStorage.removeItem("token");
              window.location.href = "/login";
              return Promise.reject(error);
            } finally {
              isRefreshing = false;
            }
          } else {
            
            // Si la requête est en cours de rafraîchissement, mettre en attente
            return new Promise((resolve) => {
              subscribeToTokenRefresh((token) => {
                originalConfig.headers["Authorization"] = "Bearer " + token;
                resolve(api(originalConfig));
              });
            });
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return api;
}