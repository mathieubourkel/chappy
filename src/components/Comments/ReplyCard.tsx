/* eslint-disable @typescript-eslint/no-explicit-any */
import {Avatar, Button, Spinner, Typography } from '@material-tailwind/react';
import user from "../../assets/img/icon_user.png"
import { intRepliesComment, intReplyComment, } from '../../services/interfaces/intComment.tsx';
import { deleteReplyFromBDD, getCommentsReply, } from '../../services/api/comments.ts';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';
import ReplyModify from '../modals/ReplyModify.tsx';

type Props = {
  handleReload: () => void;
  idComment: string | undefined;
};

export default function ReplyCard({ idComment, handleReload }: Props) {
  const [replies, setReplies] = useState<intRepliesComment>([]);
  const [error, setError] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const userId: string = localStorage.getItem("id") || "";
  
  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await getCommentsReply(idComment || '');
        setReplies(data);

      } catch (error) {
        setError(true)
      } finally {
      setBusy(false)
      }
  }
    fetchData();
  }, [handleReload,idComment]);

  const handleDeleteReply = async (id: string | undefined) => {
    await deleteReplyFromBDD(id);
    handleReload();
  };


if (error) return (<div>Error Fetching Replies</div>)

  const linear = "linear-gradient(to bottom, rgb(47,44,54,1), rgb(126,55,47,1)) 1 100%"
  const CommentStyle = {display: 'block', borderLeft: '3px solid', paddingLeft: '1rem', marginLeft: '3rem', borderImage: linear}

  return (

    <>{busy ? (
      <div
        className="flex justify-center mt-20">
        <Spinner className="h-8 w-8 text-brick-300" />
      </div>) : (
          <>
            {replies ? replies.map((reply: intReplyComment) => (

        <div className=" custom-block mb-5 p-5 ml-10" placeholder={undefined} key={reply._id}>
          <div>
            <div className="flex justify-between">
              <div>
                <Typography
                  variant="h3"
                  className="mb-2 flex items-center gap-3 font-bold text-brick-300 text-sm" placeholder="">
                  <Avatar variant="circular" alt="toto" src={user} placeholder={undefined} />
                  {reply.author.username}
                </Typography>
              </div>
              <div className={"flex gap-2 items-center"}>
                {userId === reply.author.id && (
                  <>
                    <ReplyModify reply={reply} handleReload={handleReload} />
                    <Button size="sm" className={"flex items-center justify-center bg-brick-300"} onClick={() => handleDeleteReply(reply._id)}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="lg"
                        className="text-light-100"
                      />
                    </Button>

                  </>
                )}

              </div>
            </div>
            <div style={CommentStyle}>
              {parse(`${reply.content}`)}

            </div>
          </div>
        </div>

      )) : ""}
      </>
    )}
    </>
  );
}
