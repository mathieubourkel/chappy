import { useState } from "react";
import { intComment, intComments } from "../../services/interfaces/intProject";
import { Button, IconButton, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CommentCard from "./CommentCard";

type Props = {
  comments: intComments;
};

export default function Comments({ comments }: Props) {
  const [display, setDisplay] = useState<boolean>(false);

  function handleDisplay() {
    display ? setDisplay(false) : setDisplay(true);
  }

  return (
    <section className="bloc-3 mb-40">
      <div className="b3-header">
        <h2>Espace commentaire</h2>
      </div>
      <div className="b3-comments flex flex-col mt-10">
        {display ? (
          comments.map((comment: intComment, index: number) => (
            <CommentCard comment={comment} index={index} />
          ))
        ) : (
          <CommentCard comment={comments[0]} index={0} />
        )}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleDisplay} className="bg-brick-300">
          {display ? (
            <div>
              <FontAwesomeIcon icon={faMinus} className="mr-3" />
              <a>Réduire</a>
            </div>
          ) : (
            <div>
              <FontAwesomeIcon icon={faPlus} className="mr-3" />
              <a>Afficher plus</a>
            </div>
          )}
        </Button>
      </div>
      <div className="mt-10">
        <Textarea
          variant="static"
          placeholder="Rédiger un nouveau commentaire"
          className="bg-white pl-5"
        />
        <div className="flex w-full justify-between py-1.5">
          <IconButton variant="text" color="blue-gray" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </IconButton>
          <div className="flex gap-2">
            <Button variant="outlined">Annuler</Button>
            <Button>
              Envoyer
              <FontAwesomeIcon className="ml-3" icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
