/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intNotification } from "../interfaces/intProject";

const api = useApi();
const NOTIFICATION_ENDPOINT = "notification";
const NOTIFICATIONS_ENDPOINT = "notifications";


export async function getNotificationsByUser(idUser: string | null) {
  return handleApiCall(async () => await api.get(`${NOTIFICATIONS_ENDPOINT}/${idUser}`));
}

export async function addNotificationToBDD(data: any) {
    return handleApiCall(() => api.post(NOTIFICATION_ENDPOINT, data));
  }

  export async function modifyNotificationToBDD(idNotification: string | null |number, data: intNotification) {
    return handleApiCall(() => api.put(`${NOTIFICATION_ENDPOINT}/${idNotification}`, data));
  }
  
  export async function deleteNotificationFromBDD(idNotification: string | number | null) {
    return handleApiCall(() => api.delete(`${NOTIFICATION_ENDPOINT}/${idNotification}`));
  }

