/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getMembersByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('app-users?populate[projects][fields]=id&filters[projects][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}
