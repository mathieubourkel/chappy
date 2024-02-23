/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { URL_API, useApi } from "../../hooks/useApi";
import { intLogin } from "../interfaces/intAuth";
const api = useApi();

export async function login(data: intLogin) {

  const options = {
    credentials: "include",
    withCredentials: true,
  };

  try {
    const result = await api.post(`${URL_API}/auth/login`, data, options);
    const { token, user } = result.data
    localStorage.setItem("token", token);
    localStorage.setItem("name", `${user.firstname} ${user.lastname}`);
    localStorage.setItem("id", user.id);
    localStorage.setItem("email", user.email);
    return result;
  } catch (error) {
    return;
  }

    

}