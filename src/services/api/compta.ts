/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import {  intPurchase } from "../interfaces/intProject";
const api = useApi();
const COMPTA_ENDPOINT = "compta";

export async function getPurchasesByProject(idProject:string) {
    return handleApiCall(async () => await api.get(`${COMPTA_ENDPOINT}/project/${idProject}`));
  }
  
  export async function addPurchaseToBDD(data: intPurchase) {
    return handleApiCall(async () => await api.post(COMPTA_ENDPOINT, data));
  }

  export async function modifyPurchaseFromBDD(idPurchase: string, data: intPurchase) {
    return handleApiCall(async () => await api.put(`${COMPTA_ENDPOINT}/${idPurchase}`, data));
  }
  
  export async function deletePurchaseFromBDD(idPurchase: string) {
    return handleApiCall(async () => await api.delete(`${COMPTA_ENDPOINT}/${idPurchase}`));
  }