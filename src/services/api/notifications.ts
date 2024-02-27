/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { ApiPathEnum } from "../enums/api.path.enum";

const api = useApi();

  export async function viewNotificationToBDD(idNotification:string) {
    return await api.get(`${ApiPathEnum.LOG}/notif/view/${idNotification}`)
  }


