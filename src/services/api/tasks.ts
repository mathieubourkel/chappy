/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intTask } from "../interfaces/intProject";
const api = useApi();

const STEP_TASKS_ENDPOINT = "step-tasks";
export async function getTasksByStep(idStep: string | undefined) {
    return handleApiCall(() =>
      api.get(
        `${STEP_TASKS_ENDPOINT}?populate[project_step][fields]=id&filters[project_step][id][$eq]=${idStep}&populate[category][fields]=name&populate[users][fields]=name`
      )
    );
  }
  
  export async function getTaskById(idTask: number | undefined) {
    return handleApiCall(() =>
      api.get(`${STEP_TASKS_ENDPOINT}/${idTask}?populate[0]=category&populate[1]=users&populate[2]=user`)
    );
  }
  
  export async function addTaskToStepToBDD(data: intTask) {
    const body = { data };
    return handleApiCall(() => api.post(STEP_TASKS_ENDPOINT, body));
  }
  
  export async function deleteTaskFromBDD(idTask: number | undefined) {
    return handleApiCall(() => api.delete(`${STEP_TASKS_ENDPOINT}/${idTask}`));
  }
  
  export async function modifyTaskToBDD(idTask: number | undefined, data: intTask) {
    const body = { data };
    return handleApiCall(() => api.put(`${STEP_TASKS_ENDPOINT}/${idTask}`, body));
  }
  
  export async function deleteUserToTaskToBDD(idTask: number | undefined, idUser: string | number |null) {
    const body = {
      users: {
        disconnect: [idUser],
      },
    };
    return handleApiCall(() => api.put(`${STEP_TASKS_ENDPOINT}/${idTask}`, body));
  }