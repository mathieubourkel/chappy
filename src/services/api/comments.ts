/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import { intComment } from "../interfaces/intComment";

const api = useApi();
const COMMENTS_ENDPOINT = "comments";
const COMMENT_ENDPOINT = "comment";

export async function getComments(table: string,idParent: string) {
   return handleApiCall(async () => await api.get(`${COMMENTS_ENDPOINT}/${table}/${idParent}`));
  }

  export async function addCommentToBDD(data: intComment) {
    return handleApiCall(async () => await api.post(`${COMMENT_ENDPOINT}`, data));
  }

  export async function modifyCommentToBDD(idComment: string, data:intComment) {
    return handleApiCall(async () => await api.put(`${COMMENT_ENDPOINT}/${idComment}`, data));
  }
  
  export async function deleteCommentFromBDD(idComment: string) {
    return handleApiCall(async () => await api.delete(`${COMMENT_ENDPOINT}/${idComment}`));
  }