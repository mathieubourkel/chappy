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


