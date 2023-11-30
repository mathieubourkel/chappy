import axios, { AxiosInstance } from "axios";

export function useApi() {

    // const headers = {
    //     'Access-Control-Allow-Origin': '*',
    // };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_URL_API,
        
    })

    api.interceptors.request.use((config) => {
        
        const token = localStorage.getItem("accessToken");

        if(token) {
            config.headers['Authorization'] = "Bearer " + token;
        }
        return config;

    })


    api.interceptors.response.use(

        (response) => response,

        async (error) => {

            return Promise.reject(error)
        }

    )


    return api;
}