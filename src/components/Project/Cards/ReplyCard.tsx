/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import user from "../../../assets/img/icon_user.png"
import { intRepliesComment, intReplyComment, } from '../../../services/interfaces/intComment';
import { getCommentsReply } from '../../../services/api/comments.ts';
import { useEffect, useState } from 'react';

type Props = {
  idComment: string | undefined;
};

export default function ReplyCard({ idComment }: Props) {
  const [replies, setReplies] = useState<intRepliesComment>([]);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const userId: string = localStorage.getItem("id") || ""

  const handleReload = () => setReload((bool) => !bool);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCommentsReply(idComment || '');
        setReplies(result);

      } catch (error) {
        setError(true)
      }
    }
    fetchData();
  }, [reload, idComment]);

  // let isOwner:boolean = false;
  // if (reply.author.id == userId) isOwner = true;

if (error) return (<div>Error Fetching Replies</div>)

  const linear = "linear-gradient(to bottom, rgb(47,44,54,1), rgb(126,55,47,1)) 1 100%"
  const CommentStyle = {display: 'block', borderLeft: '3px solid', paddingLeft: '1rem', marginLeft: '3rem', borderImage: linear}

  return (
    <>{replies.map((reply: intReplyComment) => (

      <div className=" custom-block mb-5 p-5 ml-10" placeholder={undefined}>
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

            </div>
          </div>
          <div style={CommentStyle}
          >{reply.content}</div>
        </div>
      </div>

    ))}

    </>
  );
}
