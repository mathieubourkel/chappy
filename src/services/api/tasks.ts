/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intTask } from "../interfaces/intProject";
const api = useApi();
const TASK_ENDPOINT = "task";
const TASKS_ENDPOINT = "tasks";

export async function getTasksByStepId(idStep: string | undefined) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/step/${idStep}`));
  }
  export async function getTasksByProjectId(idProject: string | undefined) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/project/${idProject}`));
  }

  export async function getTasksByUser(idUser: string | undefined |null) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/owner/${idUser}`));
  }

  export async function getTasksByUsers(idUser: string | undefined|null) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/member/${idUser}`));
  }
  
  export async function getTaskById(idTask: number | undefined) {
    return handleApiCall(async () => await api.get(`${TASK_ENDPOINT}/${idTask}`));
  }
  
  export async function addTaskToStepToBDD(data: intTask) {
    return handleApiCall(async () => await api.post(TASK_ENDPOINT, data));
  }
 
  export async function modifyTaskToBDD(idTask: number | undefined, data: intTask) {
    return handleApiCall(async () => await api.put(`${TASK_ENDPOINT}/${idTask}`, data));
  }
  
  export async function deleteUserToTaskToBDD(idTask: number | undefined, idUser: string | number |null) {
    return handleApiCall(async () => await api.put(`${TASK_ENDPOINT}/${idTask}/delete/${idUser}`));
  }

  export async function deleteTaskFromBDD(idTask: number | undefined) {
    return handleApiCall(async () => await api.delete(`${TASK_ENDPOINT}/${idTask}`));
  }
  