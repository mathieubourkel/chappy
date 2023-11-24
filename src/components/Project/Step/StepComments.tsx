/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { intComment, intComments } from "../../../services/interfaces/intProject";
import { Button, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CommentCard from "../Project/CommentCard";


export default function Comments() {
  const [display, setDisplay] = useState<boolean>(false);
  const [comments, setComment] = useState<intComments>([
    {content: "contenu du commentaire 1", author: "Bob"},
    {content: "contenu du commentaire 2", author: "Jean"},
    {content: "contenu du commentaire 3", author: "Michel"},

  ])
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
            <>
              <FontAwesomeIcon icon={faMinus} className="mr-3" />
              <a>Réduire</a>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} className="mr-3" />
              <a>Afficher plus</a>
            </>
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
