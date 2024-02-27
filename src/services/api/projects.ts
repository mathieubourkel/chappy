import {  useApi } from "../../hooks/useApi";
import { ApiPathEnum } from "../enums/api.path.enum";
import { intProject } from "../interfaces/intProject";
// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

  export async function getProjectById(idProject: string) {
    return await api.get(`${ApiPathEnum.PROJECT}/${idProject}`)
  }

  export async function addProjectToBDD(data: intProject) {
    data.budget = Number(data.budget)
    return await api.post(ApiPathEnum.PROJECT, data)
  }
  
  export async function deleteProjectFromBDD(idProject: string) {
    return await api.delete(`${ApiPathEnum.PROJECT}/${idProject}`)
  }
  
  export async function modifyProjectToBDD(idProject: string, data: intProject) {
    data.budget = Number(data.budget)
    return await api.put(`${ApiPathEnum.PROJECT}/${idProject}`, data)
  }

  export async function userRejoinProject(code:string) {
    return await api.put(`rejoin`, {code})
  }