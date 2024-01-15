/* eslint-disable @typescript-eslint/no-explicit-any */
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Avatar,Button,Card,CardBody,Typography} from "@material-tailwind/react";
import user from "../../../assets/img/icon_user.png"
import { intComment } from "../../../services/interfaces/intProject";

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
              className="mb-2 flex items-center gap-3 font-bold text-marine-300" placeholder="">
              <Avatar variant="circular" alt="toto" src={user} placeholder={undefined} />
              {comment.author.firstname}
            </Typography>
          </div>
          <div>
            <Button variant="outlined" size="sm" className={"flex items-center justify-center"}>
              <FontAwesomeIcon
                icon={faReply}
                size="xl"
                className="mr-3 text-marine-100"
              />
              <span className="hidden lg:flex whitespace-nowrap">Répondre</span>
            </Button>
          </div>
        </div>
        <div style={CommentStyle}
        >{comment.content}</div>
      </CardBody>
    </Card>
  );
}
