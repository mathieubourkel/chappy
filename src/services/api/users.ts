/* eslint-disable react-hooks/rules-of-hooks */
import { URL_API, handleApiCall, useApi } from "../../hooks/useApi";
import { intProfileUser } from "../interfaces/intProject";
import { intCompany, intLightCompany, intUser } from "../interfaces/intUser";
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

  export async function modifyUserToBDD(data: intProfileUser) {
    return handleApiCall(async () => await api.put(`${USER_ENDPOINT}`, data));
  }

  export async function resetPwd(data: {oldPassword: string, newPassword: string, email: string}) {
    return handleApiCall(async () => await api.put(`${URL_API}/auth/resetPwd`, data));
  }


  
  export async function deleteUserToProjectToBDD(
      idProject: number | string | undefined,
      idUser: number | string | null
  ) {
    return handleApiCall(async () => await api.put(`${PROJECT_ENDPOINT}/${USER_ENDPOINT}/delete`, {idProject, idUser}));
  }

  export async function getAllCompanies() {
    return handleApiCall(async () => await api.get(`${COMPANIES_ENDPOINT}/`));
  }
  
  export async function addUserToBDD(data: intUser) {
    const body = data;
    return handleApiCall(async () => await api.post(`${URL_API}/auth/register`, body));
  }

  export async function addUserAndCompanyToBDD(data: intUser, dataCompany: intCompany) {
    const body = {...data, ...dataCompany}
    return handleApiCall(async () => await api.post(`${URL_API}/auth/registerWithCompany`, body));
  }

  export async function getUserInfo() {
    return handleApiCall(async () => await api.get(`${USER_ENDPOINT}`));
  }

  export async function getAllUsers() {
    return handleApiCall(async () => await api.get(`${USERS_ENDPOINT}`));
  }

export async function addCompanyToBDDFromUser(data: intCompany) {
  return handleApiCall(async () => await api.post(`company`, data))
}

export async function modifyCompanyToBDD(idCompany: number | string |null, data: intCompany) {
  return handleApiCall(async () => await api.put(`company/${idCompany}`, data))
}

export async function rejoinCompany(data: intLightCompany) {
  return handleApiCall(async () => await api.put(`${USER_ENDPOINT}/rejoinCompany`, data))
}

export async function quitCompany() {
  return handleApiCall(async () => await api.put(`${USER_ENDPOINT}/quitCompany`, {}))
}

export async function deleteCompanyToBDD(idCompany: string |null| number) {
  return handleApiCall(async () => await api.delete(`company/${idCompany}`))
}



