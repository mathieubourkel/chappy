/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intTask } from "../interfaces/intProject";
const api = useApi();

export async function getTasksByStep(idStep:string | undefined) {
    
    try {
        const {data} = await api.get('step-tasks?populate[project_step][fields]=id&filters[project_step][id][$eq]=' + idStep + '&populate[category][fields]=name&populate[users][fields]=name');
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addTaskToStepToBDD(data:intTask) {
    const body = {data}
    try {
        const {data} = await api.post('step-tasks', body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deleteTaskFromBDD(idTask:number | undefined) {
    try {
        const {data} = await api.delete('step-tasks/' + idTask);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function modifyTaskToBDD(idTask:number|undefined, data:intTask) {
    const body = {
        data
    }
    try {
        const {data} = await api.put('step-tasks/' + idTask, body);
        return data.data;
    } catch (error) {
        return error
    }
}


