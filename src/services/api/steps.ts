/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intStep } from "../interfaces/intStep";

const api = useApi();
const STEP_ENDPOINT = "step";

export async function getStepsByIdProject(idProject: string) {
  return handleApiCall(async () => await api.get(`steps/${idProject}`));
}

export async function getStepById(idStep: string) {
  return handleApiCall(async () => await api.get(`${STEP_ENDPOINT}/${idStep}`));
}

export async function addProjectStepToBDD(data: intStep) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.post(STEP_ENDPOINT, data));
  }

  export async function modifyStepToBDD(idStep: string, data: intStep) {
    data.budget = Number(data.budget)
    return handleApiCall(async () => await api.put(`${STEP_ENDPOINT}/${idStep}`, data));
  }

  export async function deleteStepFromBDD(idStep: string) {
    return handleApiCall(async () => await api.delete(`${STEP_ENDPOINT}/${idStep}`));
  }





