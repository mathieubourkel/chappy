/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function login(data: any) {
  const body = {
    identifier: data.email,
    password: data.password
  };
  try {
    const { data } = await api.post("auth/local", body);
    localStorage.setItem('token', data.jwt); 
    localStorage.setItem('name', data.user.firstName + ' ' + data.user.lastName);
    localStorage.setItem('id', data.user.id);  
    return data;
    
  } catch (error) {
    console.log(error);
  }
}

export async function signup(data: any) {
  const body = {
    data,
  };

  try {
    const { data } = await api.post("auth/local/register", body);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
