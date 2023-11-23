/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { intComment, intComments } from "../../services/interfaces/intProject";
import { Button, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CommentCard from "./CommentCard";

type Props = {
  comments: intComments;
  setComment: (comments:intComments) => void;
};

export default function Comments({ comments, setComment }: Props) {
  const [display, setDisplay] = useState<boolean>(false);

  function handleDisplay() {
    display ? setDisplay(false) : setDisplay(true);
  }

  const [form, setForm] = useState<intComment>({
    content: "", author: "Auteur Dynamique"
})

function handleChange(e:any){
  const { name, value } = e.target;
  setForm({...form, [name] : value})

}

function handleSubmit(e:FormEvent){
  e.preventDefault(); 
  setComment([...comments, form])
  setForm({content: "", author:"Autre auteur dynamique"})
}

function handleDelete(){
  setForm({...form, content: ""})
}
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
        <form onSubmit={(e:any) => handleSubmit(e)}>
        <Textarea
          variant="static"
          placeholder="Rédiger un nouveau commentaire"
          className="bg-white pl-5 rounded-xl"
          name="content" value={form.content} id="content"
          onChange={(e:any)=> handleChange(e)}
        />
        <div className="flex w-full justify-end py-1.5">
          <div className="flex gap-2">
            <Button variant="outlined"
            onClick={handleDelete}
            >Annuler</Button>
            <Button type="submit">
              Envoyer
              <FontAwesomeIcon className="ml-3" icon={faPaperPlane} />
            </Button>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
}
