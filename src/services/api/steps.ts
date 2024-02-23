/* eslint-disable react-hooks/rules-of-hooks */
import {  useApi } from "../../hooks/useApi";
import { intCreateStep, intStep } from "../interfaces/intStep";

const api = useApi();
const STEP_ENDPOINT = "step";


export async function getStepById(idStep: string) {
  return  await api.get(`${STEP_ENDPOINT}/${idStep}`)
}

export async function addProjectStepToBDD(data: intCreateStep) {
    data.budget = Number(data.budget)
    return  await api.post(STEP_ENDPOINT, data)
  }

  export async function modifyStepToBDD(idStep: string, data: intStep) {
    data.budget = Number(data.budget)
    return await api.put(`${STEP_ENDPOINT}/${idStep}`, data)
  }

  export async function deleteStepFromBDD(idStep: string) {
    return await api.delete(`${STEP_ENDPOINT}/${idStep}`)
  }





