/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faPen,
  faReply,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Avatar,Button,Card,CardBody,Typography} from "@material-tailwind/react";
import user from "../../../assets/img/icon_user.png"
import { intComment } from '../../../services/interfaces/intComment';

type Props = {
  comment: intComment;
};

export default function CommentCard({ comment }: Props) {

  const linear = "linear-gradient(to bottom, rgb(47,44,54,1), rgb(126,55,47,1)) 1 100%"
  const CommentStyle = {display: 'block', borderLeft: '3px solid', paddingLeft: '1rem', marginLeft: '3rem', borderImage: linear}

  return (
    <Card className="w-full custom-block mb-5" placeholder={undefined}>
      <CardBody placeholder={undefined}>
        <div className="flex justify-between">
          <div>
            <Typography
              variant="h3"
              className="mb-2 flex items-center gap-3 font-bold text-marine-300 text-sm" placeholder="">
              <Avatar variant="circular" alt="toto" src={user} placeholder={undefined} />
              {comment.author.username}
            </Typography>
          </div>
          <div className={"flex gap-2 items-center"}>
            <Button variant="outlined" size="sm" className={"flex items-center justify-center"}>
              <FontAwesomeIcon
                icon={faReply}
                size="lg"
                className="mr-3 text-marine-100"
              />
              <span className="hidden lg:flex whitespace-nowrap">Répondre</span>
            </Button>

            <Button size="sm" className={"flex items-center justify-center bg-marine-300"}>
              <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  className="text-light-100"
              />
            </Button>

            <Button size="sm" className={"flex items-center justify-center bg-brick-300"}>
              <FontAwesomeIcon
                  icon={faXmark}
                  size="lg"
                  className="text-light-100"
              />
            </Button>
          </div>
        </div>
        <div style={CommentStyle}
        >{comment.content}</div>
      </CardBody>
    </Card>
  );
}
