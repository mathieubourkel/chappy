/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";

const api = useApi();
const LOG_ENDPOINT = "log";

export async function getNotificationsByUser() {
  return await api.get(`${LOG_ENDPOINT}/notifs`)
}

  export async function viewNotificationToBDD(idNotification:string) {
    return await api.get(`${LOG_ENDPOINT}/notif/view/${idNotification}`)
  }


