import { handleApiCall, useApi } from "../../hooks/useApi";
import { intProjectDash } from "../interfaces/intProject";
// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();
const PROJECT_ENDPOINT = "project";

export async function getProjectsFromOwner() {
    return handleApiCall(async () => await api.get(`my-projects`));
  }
  
  export async function getProjectsFromUsers() {
    return handleApiCall(async () => await api.get(`my-collabs`));
  }
  
  export async function getProjectById(idProject: string | undefined) {
    return handleApiCall(async () => await api.get(`${PROJECT_ENDPOINT}/${idProject}`));
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export async function addProjectToBDD(data: any) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.post(PROJECT_ENDPOINT, data));
  }
  
  export async function deleteProjectFromBDD(idProject: string | number | undefined) {
    return handleApiCall(async () => await api.delete(`${PROJECT_ENDPOINT}/${idProject}`));
  }
  
  export async function modifyProjectToBDD(idProject: string | undefined, data: intProjectDash) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.put(`${PROJECT_ENDPOINT}/${idProject}`, data));
  }

  export async function userRejoinProject(code:string) {
    return handleApiCall(async () => await api.put(`rejoin`, {code}));
  }