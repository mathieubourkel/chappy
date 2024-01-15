/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export interface Login {
  email: string;
  password: string;
}

export async function login(data: Login) {

  const body = {
    email: data.email,
    password: data.password,
  };

  const options = {
    credentials: "include",
    withCredentials: true,
  };


  try {
    const result = await api.post(`${import.meta.env.VITE_URL_AUTH}/login`, body, options);
    const { token, user } = result.data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("name", `${user.firstname} ${user.lastname}`);
    localStorage.setItem("id", user.id);
    localStorage.setItem("email", user.email);
    return result;

  } catch (error) {
    console.log(error);
  }
}