/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intTask } from "../interfaces/intTask";
const api = useApi();
const TASK_ENDPOINT = "task";
const TASKS_ENDPOINT = "tasks";

  // Calendar
  export async function getTasksByProjectId(idProject: string) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/project/${idProject}`));
  }

  export async function getTasksByStepId(idStep: string) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/step/${idStep}`));
  }

  export async function getTasksByUser() {
    return handleApiCall(async () => await api.get(`my-tasks`));
  }

  export async function getTasksByUsers(idUser: number) {
    return handleApiCall(async () => await api.get(`${TASKS_ENDPOINT}/member/${idUser}`));
  }

  export async function getTaskById(idTask: string) {
    return handleApiCall(async () => await api.get(`${TASK_ENDPOINT}/${idTask}`));
  }
  
  export async function addTaskToStepToBDD(data: intTask) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.post(TASK_ENDPOINT, data));
  }
 
  export async function modifyTaskToBDD(idTask: string, data: intTask) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.put(`${TASK_ENDPOINT}/${idTask}`, data));
  }
  
  export async function deleteUserToTaskToBDD(idTask: string, idUser:number) {
    return handleApiCall(async () => await api.put(`${TASK_ENDPOINT}/members/delete`, {idTask, idUser}));
  }

  export async function deleteTaskFromBDD(idTask: string) {
    return handleApiCall(async () => await api.delete(`${TASK_ENDPOINT}/${idTask}`));
  }
  