/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intDocument } from "../interfaces/intProject";

const api = useApi();
const DOCUMENTS_ENDPOINT = "documents";

export async function getDocumentsByProject(idProject: string | undefined) {
  return handleApiCall(() =>
    api.get(`${DOCUMENTS_ENDPOINT}?populate[0]=project&filters[project][id][$eq]=${idProject}`)
  );
}

export async function addDocumentToBDD(data: intDocument) {
  const body = { data };
  return handleApiCall(() => api.post(DOCUMENTS_ENDPOINT, body));
}

export async function deleteDocumentFromBDD(idDocument: number | undefined) {
  return handleApiCall(() => api.delete(`${DOCUMENTS_ENDPOINT}/${idDocument}`));
}