/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { intPurchase } from "../interfaces/intCompta";
const api = useApi();
const COMPTA_ENDPOINT = "compta";

export async function getPurchasesByProject(idProject:string) {
    return await api.get(`${COMPTA_ENDPOINT}/project/${idProject}`)
  }
  
  export async function addPurchaseToBDD(data: intPurchase) {
    return await api.post(COMPTA_ENDPOINT, data)
  }

  export async function modifyPurchaseFromBDD(idPurchase: string, data: intPurchase) {
    return await api.put(`${COMPTA_ENDPOINT}/${idPurchase}`, data)
  }
  
  export async function deletePurchaseFromBDD(idPurchase: string) {
    return await api.delete(`${COMPTA_ENDPOINT}/${idPurchase}`)
  }