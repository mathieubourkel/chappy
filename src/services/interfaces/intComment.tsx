import { RefCommentEnum } from "../enums/comment.ref.enum"
import { StatusCommentEnum } from "../enums/status.enum"

export interface intComment {
    _id?: string,
    ref: RefCommentEnum,
    refId: string,
    author:
      {
          id : string,
          username: string
      }
    content: string,
    status: StatusCommentEnum,
    medias?: string[]
}

export interface intReplyComment {
  _id?: string,
  commentId?: string,
  author:
    {
      id : string,
      username: string
    }
  content: string,
  status: StatusCommentEnum,
  medias?: string[]
}

export type intComments = intComment[]
export type intRepliesComment = intReplyComment[]