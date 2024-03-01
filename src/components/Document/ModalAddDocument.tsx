/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Dialog,Card,CardBody,CardFooter,Typography,Input} from "@material-tailwind/react";
import { addDocumentToBDD } from "../../services/api/documents.ts";
import SelectTypeDocument from "../elements/Select/SelectTypeDocument.tsx";
import { Type } from "../../services/enums/document.type.enum.ts";
import { intDocument, intDocuments } from "../../services/interfaces/intDocument.tsx";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface.tsx";
import MagicButton from "../elements/Buttons/MagicButton.tsx";
import { ButtonTypeEnum } from "../../services/enums/button.type.ts";

type Props = {
  setDocuments: (documents:intDocuments) => void;
  documents: intDocuments
  open: boolean
  handleOpen: () => void;
};

export default function ModalAddDocument({ setDocuments, documents, open, handleOpen }: Props) {
  const [form, setForm] = useState<intDocument>({path: "", type: 0, _id:'', project: ''});

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newDoc = await addDocumentToBDD(form);
    setDocuments([newDoc.data, ...documents])
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
                Ajouter un document
              </Typography>
              <Input
                label="Chemin d'accès du document"
                className={"border-select"}
                size="lg"
                name="path"
                id="path"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <SelectTypeDocument
                value={Type[form.type]}
                handleDocument={handleTypeDocument}
              />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.ADD} />
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
