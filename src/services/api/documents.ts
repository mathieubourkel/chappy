import { handleApiCall, useApi } from "../../hooks/useApi";
import { intDocument } from "../interfaces/intProject";
// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();
const DOCUMENT_ENDPOINT = "document";
const DOCUMENTS_ENDPOINT = "documents";

export async function getDocumentsByProject(idProject: string | undefined) {
  return handleApiCall(async () => await api.get(`${DOCUMENTS_ENDPOINT}/${idProject}`));
}

export async function addDocumentToBDD(data: intDocument) {
  return handleApiCall(async () => await api.post(DOCUMENT_ENDPOINT, data));
}

export async function modifyDocumentFromBDD(idDocument: number, data: intDocument) {
  return handleApiCall(async () => await api.put(`${DOCUMENT_ENDPOINT}/${idDocument}`, data));
}

export async function deleteDocumentFromBDD(idDocument: number) {
  return handleApiCall(async () => await api.delete(`${DOCUMENT_ENDPOINT}/${idDocument}`));
}