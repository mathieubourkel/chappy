/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import { ApiPathEnum } from "../enums/api.path.enum";
import { intCompta } from "../interfaces/intCompta";
const api = useApi();

  export async function addPurchaseToBDD(data: intCompta) {
    return await api.post(ApiPathEnum.COMPTA, data)
  }

  export async function modifyPurchaseFromBDD(idCompta: string, data: intCompta) {
    return await api.put(`${ApiPathEnum.COMPTA}/${idCompta}`, data)
  }
  
  export async function deletePurchaseFromBDD(idCompta: string) {
    return await api.delete(`${ApiPathEnum.COMPTA}/${idCompta}`)
  }