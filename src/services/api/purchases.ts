/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getPurchasesByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('purchases?populate[0]=project&filters[project][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}
