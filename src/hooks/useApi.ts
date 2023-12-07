import axios, { AxiosInstance } from "axios";
import { refreshToken } from "../services/api/auth";

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
      console.log("request interceptor");
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
      console.log("J'intercepte une réponse qui va bien");
      return res;
    },
    async (err) => {
      console.log(err);
      console.log("J'intercepte une réponse en erreur");
      const originalConfig = err.config;
      originalConfig._toto = true;
      // pour éviter boucle infinie du refreshToken

      if (err.response && err.response.status === 401) {
        if (!originalConfig._retry) {
          originalConfig._retry = true;
        }

        try {
          const rs = await refreshToken();

          if (rs) {
            originalConfig.headers["Authorization"] = "Bearer " + rs.data.jwt;
          }
          return axios(originalConfig);
        } catch (error) {
          if (error) {
            return Promise.reject(error);
          }

          return Promise.reject(error);
        }
      }

      if (err.response && err.response.status === 403) {
        return Promise.reject(err.response.data);
      }

      return Promise.reject(err);
    }
  );

  return api;
}
