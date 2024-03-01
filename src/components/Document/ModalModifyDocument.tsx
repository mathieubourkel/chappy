/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Dialog,Card,CardBody,CardFooter,Typography,Input,} from "@material-tailwind/react";
import {Type} from "../../services/enums/document.type.enum.ts";
import SelectTypeDocument from "../elements/Select/SelectTypeDocument.tsx";
import { modifyDocumentFromBDD } from "../../services/api/documents.ts";
import { intDocument } from "../../services/interfaces/intDocument.tsx";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface.tsx";
import { ButtonTypeEnum } from "../../services/enums/button.type.ts";
import MagicButton from "../elements/Buttons/MagicButton.tsx";

type Props = {
  document: intDocument
  setDocument: (document:intDocument) => void;
  open: boolean
  handleOpen: () => void;
};

export default function ModalModifyDocument({ document, setDocument, open, handleOpen }: Props) {

  
  const [form, setForm] = useState<intDocument>(document);

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tmpDoc = await modifyDocumentFromBDD(document._id, form)
    setDocument(tmpDoc.data)
    handleOpen()
  }
  
  const handleTypeDocument = (value:any) : void => {
    setForm({ ...form, type: value.value })
  }

  return (
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Modifier le document
              </Typography>
              <Input
                label="Chemin d'accès du document"
                size="lg"
                className={"border-select"}
                name="path"
                id="path"
                value={form.path}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />

              <SelectTypeDocument
                  value={Type[form.type]}
                  handleDocument={handleTypeDocument}
              />

            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.MODIFY}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
