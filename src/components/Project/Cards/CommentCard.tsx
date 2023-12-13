import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Avatar,Button,Card,CardBody,Typography} from "@material-tailwind/react";
import user from "../../../assets/img/icon user.png"
import { intComment } from "../../../services/interfaces/intProject";

type Props = {
  comment: intComment;
};

export default function CommentCard({ comment }: Props) {
  return (
    <Card className="w-full custom-block mb-10">
      <CardBody>
        <div className="flex justify-between">
          <div>
            <Typography
              variant="h3"
              className="mb-2 flex items-center gap-3 font-bold text-marine-300"
            >
              <Avatar variant="circular" alt="toto" src={user} />
              {comment.author.firstName}
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
        <Typography className="comment-bar">{comment.content}</Typography>
      </CardBody>
    </Card>
  );
}
