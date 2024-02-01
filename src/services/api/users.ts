/* eslint-disable react-hooks/rules-of-hooks */
import { URL_API, handleApiCall, useApi } from "../../hooks/useApi";
import { intProfileUser } from "../interfaces/intProject";
import { intCompany, intUser } from "../interfaces/intUser";
import {AxiosInstance} from "axios";
const api:AxiosInstance = useApi();

const USER_ENDPOINT = "user";
const USERS_ENDPOINT = "users";

const COMPANIES_ENDPOINT = "companies";
const PROJECT_ENDPOINT = "project"



export async function getMembersByProject(idProject: string | undefined) {
    return handleApiCall(async () => await api.get(`${PROJECT_ENDPOINT}/${idProject}/members`));
  }
  
  export async function getMembersByTask(idTask: number | undefined) {
    return handleApiCall(async () => await api.get(`step-tasks/${idTask}?[fields]=id&populate[0]=users`));
  }
  
  export async function addUserToProjectToBDD(idProject: string | undefined, idUser: number) {
    return handleApiCall(async () => await api.put(`${PROJECT_ENDPOINT}/${USER_ENDPOINT}/add`,
                                                   {idProject, idUser}));
  }

  export async function modifyUserToBDD(idUser: string | null, data: intProfileUser) {
    const body = data
    console.log(body)
    return handleApiCall(() => api.put(`${USERS_ENDPOINT}/${idUser}`, body));
  }

  
  export async function deleteUserToProjectToBDD(
      idProject: number | string | undefined,
      idUser: number | string | null
  ) {
    return handleApiCall(() => api.put(`${PROJECT_ENDPOINT}/${USER_ENDPOINT}/delete`, {idProject, idUser}));
  }
  
  export async function addUserToTaskToBDD(idTask: number | undefined, idUser: number | undefined) {
    const body = {
      app_users: {
        connect: [idUser],
      },
    };
    return handleApiCall(() => api.put(`step-tasks/${idTask}`, body));
  }

  
  export async function getAllCompanies() {
    return handleApiCall(async () => await api.get(`${COMPANIES_ENDPOINT}/`));
  }
  
  export async function addUserToBDD(data: intUser) {
    const body = data;
    console.log("body", body, "data", data)
    return handleApiCall(async () => await api.post(`${URL_API}/auth/register`, body));
  }

  export async function getUserInfo() {
    return handleApiCall(async () => await api.get(`${USER_ENDPOINT}/`));
  }

  export async function getAllUsers() {
    return handleApiCall(async () => await api.get(`${USERS_ENDPOINT}/`));
  }

export async function addCompanyToBDD(data: intCompany) {
  const body = data;
  console.log("body", body, "data", data)
  return handleApiCall(async () => await api.post(`${URL_API}/auth/company/register`, body))
}



