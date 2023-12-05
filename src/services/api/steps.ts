/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intStep } from "../interfaces/intProject";
const api = useApi();

export async function addProjectStepToBDD(data:intStep) {
    const body = {data}
    try {
        const {data} = await api.post('project-steps', body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deleteStepFromBDD(idStep:string | undefined) {
    try {
        const {data} = await api.delete('project-steps/' + idStep);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function modifyStepToBDD(idStep:string|undefined, data:intStep) {
    const body = {
        data
    }
    try {
        const {data} = await api.put('project-steps/' + idStep, body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getStepById(idStep:string | undefined) {
    
    try {
        const {data} = await api.get('project-steps/'+ idStep);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function getTasksByStepId(idStep:string | undefined) {
    
    try {
        const {data} = await api.get('project-steps/' + idStep + '?[fields]=id&populate[step_tasks][fields]=id');
        return data.data;
    } catch (error) {
        return error
    }
}



