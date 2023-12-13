/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Textarea } from '@material-tailwind/react'
import { FormEvent, useState } from 'react';
import { InputEvent, intComment } from '../../../services/interfaces/intProject';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './comment.css'
import { addCommentToBDD } from '../../../services/api/comments';

type Props = {
  table: string
  idParent: string  | undefined
  handleReload: () => void;
}

export default function CreateComment({ idParent, table, handleReload}:Props) {
  console.log('CreateCommentComposant')
  const idUser = localStorage.getItem('id')
  const [form, setForm] = useState<intComment>({
    content: "", author: {id: idUser}, table:table,
     idParent:idParent
})

function handleChange(e:InputEvent){
  const { name, value } = e.target;
  setForm({...form, [name] : value})

}

function handleSubmit(e:FormEvent){
  e.preventDefault();
  console.log(form)
  addCommentToBDD(form)
  setForm({...form, content:""})
  handleReload();
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
            <Button
                variant="outlined"
                onClick={handleDelete}
                size={"sm"}
                className={"font-extrabold"}
            >Annuler</Button>
            <Button type="submit"
                    size={"sm"}
                    className={"font-extrabold"}>
              Envoyer
              <FontAwesomeIcon className="ml-3" icon={faPaperPlane} />
            </Button>
          </div>
        </div>
        </form>
      </div>
  )
}
