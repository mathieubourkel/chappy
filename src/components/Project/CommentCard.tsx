/* eslint-disable @typescript-eslint/no-explicit-any */
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import user from "../../assets/img/icon user.png";
import { intComment } from "../../services/interfaces/intProject";

type Props = {
  index: number
  comment: intComment
}

export default function CommentCard({comment, index}:Props) {

  return (
    <Card className="b3-comment w-full mb-5 shadow-none" key={index}>
      <CardBody>
        <div className="flex justify-between">
          <div>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 flex items-center gap-3"
          >
            <Avatar variant="circular" alt="toto" src={user} />
            {comment.author}
          </Typography>
          </div>
          <div>
          <Button variant="outlined" size="sm">
            <FontAwesomeIcon
              icon={faReply}
              size="xl"
              className="mr-3 text-marine-100"
            />
            <a className="hidden md:flex">Répondre</a>
          </Button>
            </div>
          
        </div>
        <Typography className="b3-comment-bar">{comment.content}</Typography>
      </CardBody>
    </Card>
  );
}
