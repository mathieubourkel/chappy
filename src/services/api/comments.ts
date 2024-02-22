/* eslint-disable react-hooks/rules-of-hooks */
import { handleApiCall, useApi } from "../../hooks/useApi";
import {
  intComment,
  intReplyComment,
} from '../interfaces/intComment';

const api = useApi();
const COMMENTS_ENDPOINT = "comments";
const COMMENT_ENDPOINT = "comment";
const RESPONSE_ENDPOINT = "response";

export async function getComments(table: string,idParent: string) {
   return handleApiCall(async () => await api.get(`${COMMENTS_ENDPOINT}/${table}/${idParent}`));
  }

  export async function addCommentToBDD(data: intComment) {
    return handleApiCall(async () => await api.post(`${COMMENT_ENDPOINT}`, data));
  }

  export async function modifyCommentToBDD(idComment: string, data:intComment) {
  console.log(data)
    return handleApiCall(async () => await api.patch(`${COMMENT_ENDPOINT}/${idComment}`, data));
  }
  
  export async function deleteCommentFromBDD(idComment: string) {
    return handleApiCall(async () => await api.delete(`${COMMENT_ENDPOINT}/${idComment}`));
  }

  export async function getCommentsReply(idComment: string) {
  return handleApiCall(async () => await api.get(`${COMMENT_ENDPOINT}/${RESPONSE_ENDPOINT}/${idComment}`));
  }

export async function addCommentReplyToBDD(data: intReplyComment) {
  return handleApiCall(async () => await api.post(`${RESPONSE_ENDPOINT}`, data));
}

export async function modifyReplyToBDD(idResponse: string, data:intReplyComment) {
  console.log(data)
  return handleApiCall(async () => await api.patch(`${RESPONSE_ENDPOINT}/${idResponse}`, data));
}

export async function deleteReplyFromBDD(idResponse: string | undefined) {
  return handleApiCall(async () => await api.delete(`${RESPONSE_ENDPOINT}/${idResponse}`));
}
