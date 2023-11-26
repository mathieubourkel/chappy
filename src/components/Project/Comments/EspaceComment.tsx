/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { intComment, intComments } from "../../../services/interfaces/intProject";
import DisplayMore from "./DisplayMore";
import CreateComment from "./CreateComment";
import CommentCard from "../Cards/CommentCard";

type Props = {
  comments: intComments;
  setComment: (comments:intComments) => void;
};

export default function EspaceComment({ comments, setComment }: Props) {
  
  const [display, setDisplay] = useState<boolean>(false);
  
  return (
    <section className="bloc-3 mb-40">
      <div className="b3-header">
        <h2>Espace commentaire</h2>
      </div>
      <div className="b3-comments flex flex-col mt-10">
        {display ? (
          comments.map((comment: intComment, index: number) => (
            <CommentCard comment={comment} key={index} />
          ))
        ) : (
          <CommentCard comment={comments[0]} key={0} />
        )}
      </div>
      <div className="flex justify-center">
        <DisplayMore state={display} setState={setDisplay}/>
      </div>
      <CreateComment state={comments} setState={setComment}/>
      
    </section>
  );
}
