/* eslint-disable react-hooks/rules-of-hooks */
import {  useApi } from "../../hooks/useApi";
import { ApiPathEnum } from "../enums/api.path.enum";
import { intCreateStep, intStep } from "../interfaces/intStep";

const api = useApi();

export async function addProjectStepToBDD(data: intCreateStep) {
    data.budget = Number(data.budget)
    return  await api.post(ApiPathEnum.STEP, data)
  }

  export async function modifyStepToBDD(idStep: string, data: intStep) {
    data.budget = Number(data.budget)
    return await api.put(`${ApiPathEnum.STEP}/${idStep}`, data)
  }

  export async function deleteStepFromBDD(idStep: string) {
    return await api.delete(`${ApiPathEnum.STEP}/${idStep}`)
  }





