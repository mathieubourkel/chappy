/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intProfileUser } from "../interfaces/intProject";
import { intForms } from "../interfaces/intForms";
const api = useApi();

export async function getMembersByProject(idProject: string | undefined) {
    return handleApiCall(() => api.get(`projects/${idProject}?[fields]=id&populate[0]=users`));
  }
  
  export async function getMembersByTask(idTask: number | undefined) {
    return handleApiCall(() => api.get(`step-tasks/${idTask}?[fields]=id&populate[0]=users`));
  }
  
  export async function addUserToProjectToBDD(idProject: string | undefined, idUser: number) {
    const body = {
      users: {
        connect: [idUser],
      },
    };
    return handleApiCall(() => api.put(`projects/${idProject}`, body));
  }

  export async function modifyUserToBDD(idUser: string | null, data: intProfileUser) {
    const body = data
    console.log(body)
    return handleApiCall(() => api.put(`users/${idUser}`, body));
  }

  
  export async function deleteUserToProjectToBDD(idProject: string | undefined, idUser: number|string|null) {
    const body = {
      users: {
        disconnect: [idUser],
      },
    };
    return handleApiCall(() => api.put(`projects/${idProject}`, body));
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
    return handleApiCall(() => api.get("companies"));
  }
  
  export async function addUserToBDD(data: intForms) {
    const body = data;
    // const newBody = {...data, role: {connect: [{id:1}]}};
    console.log("body", body, "data", data)
    return handleApiCall(() => api.post("users", body));
  }

  export async function getUserInfo() {
    return handleApiCall(() => api.get("user"));
  }

  export async function getAllUsers() {
    return handleApiCall(() => api.get("users"));
  }

export async function addCompanyToBDD(data: intForms) {
  const body = {data};
  return handleApiCall(() => api.post("company", body))
}



