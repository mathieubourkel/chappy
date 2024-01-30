/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intCreatePurchase } from "../interfaces/intProject";
const api = useApi();
const PURCHASE_ENDPOINT = "purchase";

export async function getPurchasesByProject(idProject: string | undefined) {
    return handleApiCall(() => api.get(`purchases/${idProject}`));
  }
  
  export async function addPurchaseToBDD(data: intCreatePurchase) {
    data.price = Number(data.price)
    return handleApiCall(() => api.post(PURCHASE_ENDPOINT, data));
  }

  export async function modifyPurchaseFromBDD(idPurchase: number | undefined, data: any) {
    return handleApiCall(() => api.put(`${PURCHASE_ENDPOINT}/${idPurchase}`, data));
  }
  
  export async function deletePurchaseFromBDD(idPurchase: number | undefined) {
    return handleApiCall(() => api.delete(`${PURCHASE_ENDPOINT}/${idPurchase}`));
  }