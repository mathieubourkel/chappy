/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intNotification } from "../interfaces/intProject";

const api = useApi();
const NOTIFICATION_ENDPOINT = "notification";
const NOTIFICATIONS_ENDPOINT = "notifications";


export async function getNotificationsByUser() {
  return handleApiCall(async () => await api.get(`${NOTIFICATIONS_ENDPOINT}`));
}

export async function addNotificationToBDD(data: any) {
    return handleApiCall(async () => await api.post(NOTIFICATION_ENDPOINT, data));
  }

  export async function modifyNotificationToBDD(idNotification: string | null |number, data: intNotification) {
    return handleApiCall(async() => await api.put(`${NOTIFICATION_ENDPOINT}/${idNotification}`, data));
  }
  
  export async function deleteNotificationFromBDD(idNotification: string | number | null) {
    return handleApiCall(async () => await api.delete(`${NOTIFICATION_ENDPOINT}/${idNotification}`));
  }

