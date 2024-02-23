/* eslint-disable react-hooks/rules-of-hooks */
import { useApi } from "../../hooks/useApi";
import {intComment,intReplyComment,} from '../interfaces/intComment';

const api = useApi();
const COMMENTS_ENDPOINT = "comments";
const COMMENT_ENDPOINT = "comment";
const RESPONSE_ENDPOINT = "response";

export async function getComments(table: string,idParent: string) {
   return await api.get(`${COMMENTS_ENDPOINT}/${table}/${idParent}`)
  }

  export async function addCommentToBDD(data: intComment) {
    return await api.post(`${COMMENT_ENDPOINT}`, data)
  }

  export async function modifyCommentToBDD(idComment: string, data:intComment) {
    return await api.patch(`${COMMENT_ENDPOINT}/${idComment}`, data)
  }
  
  export async function deleteCommentFromBDD(idComment: string) {
    return await api.delete(`${COMMENT_ENDPOINT}/${idComment}`)
  }

  export async function getCommentsReply(idComment: string) {
  return await api.get(`${COMMENT_ENDPOINT}/${RESPONSE_ENDPOINT}/${idComment}`)
  }

export async function addCommentReplyToBDD(data: intReplyComment) {
  return await api.post(`${RESPONSE_ENDPOINT}`, data)
}

export async function modifyReplyToBDD(idResponse: string, data:intReplyComment) {
  return await api.patch(`${RESPONSE_ENDPOINT}/${idResponse}`, data)
}

export async function deleteReplyFromBDD(idResponse: string | undefined) {
  return await api.delete(`${RESPONSE_ENDPOINT}/${idResponse}`)
}
