/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Textarea } from '@material-tailwind/react'
import { FormEvent, useState } from 'react';
import { InputEvent, intComment, intComments } from '../../../services/interfaces/intProject';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type Props = {
  state: intComments,
  setState: (comments:intComments) => void;
}

export default function CreateComment({state, setState}:Props) {
  const [form, setForm] = useState<intComment>({
    content: "", author: "Auteur Dynamique"
})

function handleChange(e:InputEvent){
  const { name, value } = e.target;
  setForm({...form, [name] : value})

}

function handleSubmit(e:FormEvent){
  e.preventDefault(); 
  setState([...state, form])
  setForm({content: "", author:"Autre auteur dynamique"})
}

function handleDelete(){
  setForm({...form, content: ""})
}

  return (
    
    <div className="mt-10">
        <form onSubmit={(e:FormEvent) => handleSubmit(e)}>
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
  )
}
