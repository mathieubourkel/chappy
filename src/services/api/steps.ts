/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intStep } from "../interfaces/intProject";
const api = useApi();
const PROJECT_STEPS_ENDPOINT = "project-steps";

export async function addProjectStepToBDD(data: intStep) {
    const body = { data };
    return handleApiCall(() => api.post(PROJECT_STEPS_ENDPOINT, body));
  }
  
  export async function deleteStepFromBDD(idStep: string | undefined) {
    return handleApiCall(() => api.delete(`${PROJECT_STEPS_ENDPOINT}/${idStep}`));
  }
  
  export async function modifyStepToBDD(idStep: string | undefined, data: intStep) {
    const body = { data };
    return handleApiCall(() => api.put(`${PROJECT_STEPS_ENDPOINT}/${idStep}`, body));
  }
  
  export async function getStepById(idStep: string | undefined) {
    return handleApiCall(() => api.get(`${PROJECT_STEPS_ENDPOINT}/${idStep}`));
  }
  
  export async function getTasksByStepId(idStep: string | undefined) {
    return handleApiCall(() =>
      api.get(`${PROJECT_STEPS_ENDPOINT}/${idStep}?[fields]=id&populate[step_tasks][fields]=id`)
    );
  }
  
  export async function getStepsByIdProject(idProject: string | undefined) {
    return handleApiCall(() =>
      api.get(
        `${PROJECT_STEPS_ENDPOINT}?populate[project][fields]=id&filters[project][id][$eq]=${idProject}`
      )
    );
  }



