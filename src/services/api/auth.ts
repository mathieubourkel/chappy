/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import axios from "axios";
const api = useApi();

export interface Login {
  email: string;
  password: string;
}

export async function login(data: Login) {
  const body = {
    identifier: data.email,
    password: data.password,
  };

  const options = {
    credentials: "include",
    withCredentials: true,
  };

  try {
    const { data } = await api.post("auth/local", body, options);
    localStorage.setItem("token", data.jwt);
    localStorage.setItem(
      "name",
      data.user.firstName + " " + data.user.lastName
    );
    localStorage.setItem("id", data.user.id);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken() {
  try {
    const options = {
      withCredentials: true,
    };

    const res = await axios.get(import.meta.env.VITE_URL_API +
      "token/refresh",
      options
    );

    localStorage.setItem("token", res.data.jwt);

    return res;
  } catch (err) {
    console.log(err);
    console.log("Ma fonction refresh token na pas marcher");
  }
}
