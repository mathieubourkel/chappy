/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import {  intPurchase } from "../interfaces/intProject";
const api = useApi();
const PURCHASE_ENDPOINT = "purchase";

export async function getPurchasesByProject(idProject: string | undefined) {
    return handleApiCall(async () => await api.get(`purchases/${idProject}`));
  }
  
  export async function addPurchaseToBDD(data: intPurchase) {
    data.price = Number(data.price)
    return handleApiCall(async () => await api.post(PURCHASE_ENDPOINT, data));
  }

  export async function modifyPurchaseFromBDD(idPurchase: number, data: intPurchase) {
    data.price = Number(data.price)
    return handleApiCall(async () => await api.put(`${PURCHASE_ENDPOINT}/${idPurchase}`, data));
  }
  
  export async function deletePurchaseFromBDD(idPurchase: number) {
    return handleApiCall(async () => await api.delete(`${PURCHASE_ENDPOINT}/${idPurchase}`));
  }