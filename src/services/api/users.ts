/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intUser } from "../interfaces/intProject";
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
  
  export async function addUserToBDD(data: intUser) {
    const body = { data };
    return handleApiCall(() => api.post("users", body));
  }

  // export async function getUserInfo(idUser: string|number|null) {
  //   return handleApiCall(() => api.get(`users/${idUser}?populate[0]=projects&populate[1]=projects_collab`));
  // }

export async function getAllUsers() {
    
    try {
        const data = await api.get('users');
        return data.data
    } catch (error) {
        return error
    }
}

export async function getUserInfo(idUser: string|number|null) {
    
  try {
      const data = await api.get(`users/${idUser}?populate[0]=projects&populate[1]=projects_collab`);
      return data.data
  } catch (error) {
      return error
  }
}






