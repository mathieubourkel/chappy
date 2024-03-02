/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { URL_API, useApi } from "../../hooks/useApi";
import { intOldPwd } from "../interfaces/intAuth";
import {AxiosInstance} from "axios";
import { intProfileUser, intUser } from "../interfaces/intUser";
import { intCompany } from "../interfaces/intCompany";
const api:AxiosInstance = useApi();

const USER_ENDPOINT = "user";

const COMPANY_ENDPOINT = "group";
const PROJECT_ENDPOINT = "project"


  export async function deleteUserToProjectToBDD(idProject:string,idUser: number) {
    return await api.put(`${PROJECT_ENDPOINT}/members/delete`, {idProject, idUser})
  }
  
  export async function addUserToProjectToBDD(idProject: string, idUser: number, email:string) {
    return await api.put(`${PROJECT_ENDPOINT}/members/add`,{idProject, idUser, email})
  }

  export async function modifyUserToBDD(data: intProfileUser) {
    return await api.put(`${USER_ENDPOINT}`, data)
  }

  export async function resetPwd(data:intOldPwd) {
    return await api.put(`${USER_ENDPOINT}/resetPwd`, data)
  }

  
  export async function getAllCompanies() {
    return await api.get(`${COMPANY_ENDPOINT}/all`)
  }
  
  export async function addUserToBDD(data: intUser) {
    return await api.post(`${URL_API}/auth/register`, data);
  }

  export async function addUserAndCompanyToBDD(data:any) {
    return await api.post(`${URL_API}/auth/registerWithCompany`, data)
  }

  export async function getUserInfo() {
    return await api.get(`${USER_ENDPOINT}`)
  }

  export async function sendEmailForReset(email:string) {
    return await api.post(`${URL_API}/auth/resetPwd/sendMail`, {email: email})
  }

  export async function getEmailToken(token:string) {
    return await api.get(`${URL_API}/auth/emailToken/${token}`)
  }

  export async function resetPwdWithEmail(data: {newPwd: string, emailToken: string}) {
    return await api.post(`${URL_API}/auth/resetPwd/withMail`, data)
  }

  export async function getAllUsers() {
    return await api.get(`${USER_ENDPOINT}/all`)
  }

export async function addCompanyToBDDFromUser(data: intCompany) {
  return await api.post(`${COMPANY_ENDPOINT}`, data)
}

export async function modifyCompanyToBDD(idCompany: number, data: intCompany) {
  return await api.put(`${COMPANY_ENDPOINT}/${idCompany}`, data)
}

export async function rejoinCompanyDemand(idCompany:number) {
  return await api.get(`${COMPANY_ENDPOINT}/demand/add/${idCompany}`)
}

export async function validateDemandCompany(idDemand: number) {
  return await api.get(`${COMPANY_ENDPOINT}/demand/valid/${idDemand}`)
}

export async function refuseDemandCompany(idDemand: number) {
  return await api.get(`${COMPANY_ENDPOINT}/demand/refuse/${idDemand}`)
}

export async function quitCompany(idDemand: number) {
  return await api.get(`${COMPANY_ENDPOINT}/demand/quit/${idDemand}`)
}

export async function deleteCompanyToBDD(idCompany: number) {
  return await api.delete(`${COMPANY_ENDPOINT}/${idCompany}`)
}

export async function deleteMyAccount() {
  return await api.delete(`${USER_ENDPOINT}/my-account`)
}



