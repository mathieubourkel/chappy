/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intPurchase } from "../interfaces/intProject";
const api = useApi();

export async function getPurchasesByProject(idProject:string | undefined) {
    
    try {
        const {data} = await api.get('purchases?populate[0]=project&filters[project][id][$eq]=' + idProject);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function addPurchaseToBDD(data:intPurchase) {
    const body = {data}
    try {
        const {data} = await api.post('purchases', body);
        return data.data;
    } catch (error) {
        return error
    }
}

export async function deletePurchaseFromBDD(idPurchase:number | undefined) {

    try {
        const {data} = await api.delete('purchases/' + idPurchase);
        return data.data;
    } catch (error) {
        return error
    }
}

