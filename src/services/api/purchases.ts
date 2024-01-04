/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intPurchase } from "../interfaces/intProject";
const api = useApi();

export async function getPurchasesByProject(idProject: string | undefined) {
    return handleApiCall(() => api.get(`purchases?populate[0]=project&filters[project][id][$eq]=${idProject}`));
  }
  
  export async function addPurchaseToBDD(data: intPurchase) {
    const body = { data };
    return handleApiCall(() => api.post("purchases", body));
  }
  
  export async function deletePurchaseFromBDD(idPurchase: number | undefined) {
    return handleApiCall(() => api.delete(`purchases/${idPurchase}`));
  }