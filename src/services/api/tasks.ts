/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intTask } from "../interfaces/intTask";
const api = useApi();
const TASK_ENDPOINT = "task";
const TASKS_ENDPOINT = "tasks";

  // Calendar
  export async function getTasksByProjectId(idProject: string) {
    return await api.get(`${TASKS_ENDPOINT}/project/${idProject}`)
  }

  export async function getTasksByUser() {
    return await api.get(`my-tasks`)
  }

  export async function addTaskToStepToBDD(data: intTask) {
    data.budget = Number(data.budget)
    return await api.post(TASK_ENDPOINT, data)
  }
 
  export async function modifyTaskToBDD(idTask: string, data: intTask) {
    data.budget = Number(data.budget)
    return await api.put(`${TASK_ENDPOINT}/${idTask}`, data)
  }
  
  export async function deleteUserToTaskToBDD(idTask: string, idUser:number) {
    return await api.put(`${TASK_ENDPOINT}/members/delete`, {idTask, idUser});
  }

  export async function deleteTaskFromBDD(idTask: string) {
    return await api.delete(`${TASK_ENDPOINT}/${idTask}`)
  }
  