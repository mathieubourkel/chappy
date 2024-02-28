/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, } from '@fortawesome/free-solid-svg-icons';
import { FormEvent } from "../../../services/interfaces/generique.interface";
import { intReplyComment } from '../../../services/interfaces/intComment.tsx';
import { addCommentReplyToBDD } from '../../../services/api/comments.ts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StatusCommentEnum } from '../../../services/enums/status.enum.ts';
import {
  editorConfiguration
} from '../Comments/CK.tsx';

type Props = {
  idComment: string | undefined;
  handleReload: () => void;
};

export default function ReplyCreate({ idComment, handleReload }: Props) {
  const idUser:string = localStorage.getItem('id') ||"";
  const [form, setForm] = useState<intReplyComment>( {
                                                       commentId: idComment,
                                                       author: { id : idUser, username: "" },
                                                       content: "",
                                                       status: StatusCommentEnum.PENDING,
                                                       medias: []
                                                     });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleEditorChange = (_event: any, editor: any) => {
    const content = editor.getData();
    setForm({ ...form, content });
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    console.log(form)
    await addCommentReplyToBDD({...form, content: form.content})
    setForm({...form, content:""})
    handleReload();
  }

  return (
    <>

      <Button variant="outlined" size="sm" className={"flex items-center justify-center"} onClick={handleOpen}>
        <FontAwesomeIcon
          icon={faReply}
          size="lg"
          className="mr-3 text-marine-100"
        />
        <span className="hidden lg:flex whitespace-nowrap">Répondre</span>
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3" className={"text-brick-300 text-xl font-extrabold text-center mb-5"}>
                Répondre au commentaire
              </Typography>

              <CKEditor
                editor={ClassicEditor}
                config={ editorConfiguration }
                data={form.content}
                onChange={handleEditorChange}
              />

            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button size={"sm"} className={"bg-marine-300"} onClick={handleOpen} type="submit">
                Envoyer
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
