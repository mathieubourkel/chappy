/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { ApiPathEnum } from "../enums/api.path.enum";
import { intTask } from "../interfaces/intTask";


  const api = useApi();

  export async function addTaskToStepToBDD(data: intTask) {
    data.budget = Number(data.budget)
    return await api.post(ApiPathEnum.TASK, data)
  }
 
  export async function modifyTaskToBDD(idTask: string, data: intTask) {
    data.budget = Number(data.budget)
    return await api.put(`${ApiPathEnum.TASK}/${idTask}`, data)
  }
  
  export async function deleteUserToTaskToBDD(idTask: string, idUser:number) {
    return await api.put(`${ApiPathEnum.TASK}/members/delete`, {idTask, idUser});
  }

  export async function deleteTaskFromBDD(idTask: string) {
    return await api.delete(`${ApiPathEnum.TASK}/${idTask}`)
  }
  