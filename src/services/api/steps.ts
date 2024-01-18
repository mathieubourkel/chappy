/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intStep } from "../interfaces/intProject";
const api = useApi();
const STEP_ENDPOINT = "step";

export async function getStepsByIdProject(idProject: string | undefined) {
  return handleApiCall(async () => await api.get(`steps/${idProject}`));
}

export async function getStepById(idStep: string | undefined) {
  return handleApiCall(async () => await api.get(`${STEP_ENDPOINT}/${idStep}`));
}

export async function addProjectStepToBDD(data: intStep) {
    return handleApiCall(async () => await api.post(STEP_ENDPOINT, data));
  }

  export async function modifyStepToBDD(idStep: string | undefined, data: intStep) {
    return handleApiCall(async () => await api.put(`${STEP_ENDPOINT}/${idStep}`, data));
  }

  export async function deleteStepFromBDD(idStep: string | undefined) {
    return handleApiCall(async () => await api.delete(`${STEP_ENDPOINT}/${idStep}`));
  }





