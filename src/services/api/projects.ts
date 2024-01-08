import { handleApiCall, useApi } from "../../hooks/useApi";
import { intProject } from "../interfaces/intProject";
// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();
const PROJECT_ENDPOINT = "project";

export async function getProjectsFromOwner(idUser: string | null) {
    return handleApiCall(() => api.get(`myprojects/${idUser}`));
  }
  
  export async function getProjectsFromUsers(idUser: string | null) {
    return handleApiCall(() => api.get(`mycollabs/${idUser}`));
  }
  
  export async function getProjectById(idProject: string | undefined) {
    return handleApiCall(() =>api.get(`${PROJECT_ENDPOINT}/${idProject}`));
  }
  
  export async function getProjectNameById(idProject: string | undefined) {
    return handleApiCall(() =>api.get(`${PROJECT_ENDPOINT}/name/${idProject}`));
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export async function addProjectToBDD(data: any) {
    return handleApiCall(() => api.post(PROJECT_ENDPOINT, data));
  }
  
  export async function deleteProjectFromBDD(idProject: string | number | undefined) {
    return handleApiCall(() => api.delete(`${PROJECT_ENDPOINT}/${idProject}`));
  }
  
  export async function modifyProjectToBDD(idProject: string | undefined, data: intProject) {
    return handleApiCall(() => api.put(`${PROJECT_ENDPOINT}/${idProject}`, data));
  }

  export async function userRejoinProject(idUser: string | null,idProject: string | null, code:string) {
    const body = {code};
    return handleApiCall(() =>api.put(`${PROJECT_ENDPOINT}/${idProject}/rejoin/${idUser}`, body)
    );
  }