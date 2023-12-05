import axios, { AxiosInstance } from "axios";

export function useApi() {

    // const headers = {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //     'Access-Control-Allow-Credentials' : true,
    //     'Content-Type': 'application/json'
    // };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_URL_API,
    })

    api.interceptors.request.use((config) => {
        
        const token = localStorage.getItem("token");

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