/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getTasksByStep(idStep:string | undefined) {
    
    try {
        const {data} = await api.get('step-tasks?populate[project_step][fields]=id&filters[project_step][id][$eq]=' + idStep + '&populate[category][fields]=name&populate[app_users][fields]=name');
        return data.data;
    } catch (error) {
        return error
    }
}