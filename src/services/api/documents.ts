/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intDocument } from "../interfaces/intProject";
const api = useApi();

export async function getDocumentsByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('documents?populate[0]=project&filters[project][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addDocumentToBDD(data:intDocument) {
    const body = {data}
    try {
        const {data} = await api.post('documents', body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deleteDocumentFromBDD(idDocument:number) {

    try {
        const {data} = await api.delete('documents/' + idDocument);
        return data.data;
    } catch (error) {
        return error
    }
}

