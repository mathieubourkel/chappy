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
    email: data.email,
    password: data.password,
  };

  // const options = {
  //   credentials: "include",
  //   withCredentials: true,
  // };

  try {
    const { data: responseData } = await api.post("http://localhost:3000/auth/login", body);
    const { token, refreshToken, user } = responseData.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("name", `${user.firstname} ${user.lastname}`);
    localStorage.setItem("id", user.id);
    localStorage.setItem("email", user.email);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken() {
  try {
    const options = {
      withCredentials: true,
    };

    const res = await axios.get("http://localhost:3000/auth/login",
      options
    );
// test
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    return res;
  } catch (err) {
    console.log(err);
  }
}
