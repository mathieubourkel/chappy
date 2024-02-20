/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intNotification } from "../interfaces/intNotification";

const api = useApi();
const LOG_ENDPOINT = "log";

export async function getNotificationsByUser() {
  return handleApiCall(async () => await api.get(`${LOG_ENDPOINT}/notifs`));
}

export async function addNotificationToBDD(data: intNotification) {
    return handleApiCall(async () => await api.post(LOG_ENDPOINT, data));
  }

  export async function viewNotificationToBDD(idNotification:string, isView:boolean) {
    return handleApiCall(async() => await api.put(`${LOG_ENDPOINT}/${idNotification}`, {isView}));
  }
  
  export async function deleteNotificationFromBDD(idNotification: string) {
    return handleApiCall(async () => await api.delete(`${LOG_ENDPOINT}/${idNotification}`));
  }

