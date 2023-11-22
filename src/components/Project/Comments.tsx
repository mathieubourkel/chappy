import { useState } from "react";
import { intComment, intComments } from "../../services/interfaces/intProject";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { faReply, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  comments: intComments;
};

export default function Comments({ comments }: Props) {
  const [display, setDisplay] = useState<boolean>(false);

  function handleDisplay() {
    display ? setDisplay(false) : setDisplay(true);
  }

  return (
    <section className="bloc-3">
      <div className="b3-header">
        <h1>Espace commentaire</h1>
      </div>
      <div className="b3-comments flex flex-col mt-10">
        {display ? (
          comments.map((comment: intComment, index: number) => (
            <Card className="b3-comment w-full mb-5" key={index}>
              <CardBody>
                <div className="flex justify-between">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                  <FontAwesomeIcon icon={faUser} />
                    <a className="pl-5">{comment.author}</a>
                  </Typography>
                  <Button variant="outlined">
                  <FontAwesomeIcon icon={faReply} />
                    <a className="pl-2">Répondre</a>
                  </Button>
                </div>
                <Typography>{comment.content}</Typography>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="b3-comment">
            <div className="b3-comment-header">
              <h2>{comments[0].author}</h2>
              <Button>Répondre</Button>
            </div>
            <div className="b3-comment-body">
              <p>{comments[0].content}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={handleDisplay}>
          {display ? <a>Afficher moins</a> : <a>Afficher plus</a>}
        </button>
      </div>
      <div className="comments-modify">
        <div className="EXTERNAL">
          <p>EXTERNAL WIDGET</p>
        </div>
        <div className="comments-modify-buttons flex justify-end mr-6">
          <button className="m-4">Annuler</button>
          <button>Envoyer</button>
        </div>
      </div>
    </section>
  );
}
