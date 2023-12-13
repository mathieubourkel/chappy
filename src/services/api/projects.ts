/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intProject } from "../interfaces/intProject";
const api = useApi();
const PROJECTS_ENDPOINT = "projects";

export async function getProjectsFromOwner(idUser: string | null) {
    return handleApiCall(() =>
      api.get(
        `${PROJECTS_ENDPOINT}?populate[user][fields]=id&filters[user][id][$eq]=${idUser}&populate[project_steps]=*`
      )
    );
  }
  
  export async function getProjectsFromUsers(idUser: string | null) {
    return handleApiCall(() =>
      api.get(
        `${PROJECTS_ENDPOINT}?populate[users][fields]=id&filters[users][id][$eq]=${idUser}&populate[project_steps]=*&populate[user]=*`
      )
    );
  }
  
  export async function getProjectById(idProject: string | undefined) {
    return handleApiCall(() =>
      api.get(`${PROJECTS_ENDPOINT}/${idProject}?populate[0]=project_steps&populate[1]=user`)
    );
  }
  
  export async function getProjectNameById(idProject: string | undefined) {
    return handleApiCall(() => api.get(`${PROJECTS_ENDPOINT}/${idProject}?fields[0]=name`));
  }
  
  export async function addProjectToBDD(data: intProject) {
    const body = { data };
    return handleApiCall(() => api.post(PROJECTS_ENDPOINT, body));
  }
  
  export async function deleteProjectFromBDD(idProject: string | undefined) {
    return handleApiCall(() => api.delete(`${PROJECTS_ENDPOINT}/${idProject}`));
  }
  
  export async function modifyProjectToBDD(idProject: string | undefined, data: intProject) {
    const body = { data };
    return handleApiCall(() => api.put(`${PROJECTS_ENDPOINT}/${idProject}`, body));
  }