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
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "../../../services/interfaces/generique.interface";
import { intComment } from '../../../services/interfaces/intComment.tsx';
import { modifyCommentToBDD } from '../../../services/api/comments.ts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  editorConfiguration
} from '../Comments/CK.tsx';

type Props = {
  comment: intComment;
  handleReload: () => void;
};

export default function CommentModify({ comment, handleReload }: Props) {
  const [form, setForm] = useState<intComment>(comment);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleEditorChange = (_event: any, editor: any) => {
    const content = editor.getData();
    setForm({ ...form, content });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await modifyCommentToBDD(comment._id || '', {...form, content: form.content});
    handleReload()
  };

  return (
    <>

      <Button
        size="sm"
        className={"flex items-center justify-center bg-marine-300"}
        onClick={handleOpen}
      >
        <FontAwesomeIcon
          icon={faPen}
          size="lg"
          className="text-light-100"
        />
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
              <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Modifier le commentaire
              </Typography>

              <CKEditor
                editor={ClassicEditor}
                config={ editorConfiguration }
                data={form.content}
                onChange={handleEditorChange}
              />

            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button size={"sm"} className={"bg-brick-300"} onClick={handleOpen} type="submit">
                Modifier
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
