/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intNotification } from "../interfaces/intProject";

const api = useApi();
const NOTIFICATIONS_ENDPOINT = "notifications";

export async function getNotificationsByUser(idUser: string | null) {
  return handleApiCall(() =>
    api.get(`${NOTIFICATIONS_ENDPOINT}?populate[0]=receivers&populate[1]=sender&filters[receivers][id][$eq]=${idUser}`)
  );
}

export async function addNotificationToBDD(data: any) {
    const body = { data };
    return handleApiCall(() => api.post(NOTIFICATIONS_ENDPOINT, body));
  }
  
  export async function deleteNotificationFromBDD(idNotification: string | number | null) {
    return handleApiCall(() => api.delete(`${NOTIFICATIONS_ENDPOINT}/${idNotification}`));
  }

  export async function modifyNotificationToBDD(idNotification: string | null |number, data: intNotification) {
    const body = { data };
    return handleApiCall(() => api.put(`${NOTIFICATIONS_ENDPOINT}/${idNotification}`, body));
  }