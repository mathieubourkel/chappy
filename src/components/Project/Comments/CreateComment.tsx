/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-tailwind/react'
import { FormEvent, useState } from 'react';
import { intComment } from '../../../services/interfaces/intProject';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addCommentToBDD } from '../../../services/api/comments';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

// const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setForm({...form, [name] : value})
//
// }

const handleSubmit = (e:FormEvent) => {
  e.preventDefault();
  addCommentToBDD(form)
  setForm({...form, content:""})
  handleReload();
}

const handleDelete = () => {
  setForm({...form, content: ""})
}

  return (

      <div className="mt-10">

          <form
              onSubmit={(e: FormEvent) => handleSubmit(
                  e)}>

                  <CKEditor
                      editor={ClassicEditor}
                      data={form.content}
                      onReady={editor => {
                          console.log(
                              'Editor is ready to use!',
                              editor
                          );
                      }}
                      onChange={(_event, editor) => {
                          const content = editor.getData();
                          setForm({ ...form, content })
                      }}
                      onBlur={(_event, editor) => {
                          console.log(
                              'Blur.', editor);
                      }}
                      onFocus={(_event, editor) => {
                          console.log(
                              'Focus.', editor);
                      }}
                  />



              <div
                  className="flex w-full justify-end py-1.5 mt-5">
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
                          <FontAwesomeIcon
                              className="ml-3"
                              icon={faPaperPlane}/>
                      </Button>
                  </div>
              </div>

          </form>

      </div>
  )
}
