/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intComment } from "../interfaces/intProject";
const api = useApi();
const COMMENTS_ENDPOINT = "comments";

export async function getComments(table:string, idParent: string | undefined) {
    return handleApiCall(() => api.get(`${COMMENTS_ENDPOINT}?filters[table][$eq]=${table}&filters[idParent][$eq]=${idParent}&populate[0]=author`));
  }

  export async function addCommentToBDD(data: intComment) {
    const body = data;
    return handleApiCall(() => api.post(`${COMMENTS_ENDPOINT}`, body));
  }

  export async function modifyCommentToBDD(idComment: string |number |undefined, data:intComment) {
    const body = { data };
    return handleApiCall(() => api.put(`${COMMENTS_ENDPOINT}/${idComment}`, body));
  }
  
  export async function deleteCommentFromBDD(idComment: number | undefined) {
    return handleApiCall(() => api.delete(`${COMMENTS_ENDPOINT}/${idComment}`));
  }