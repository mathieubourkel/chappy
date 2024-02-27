/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,Input,} from "@material-tailwind/react";
import CreateButton from "../elements/Buttons/CreateButton.tsx";
import { addDocumentToBDD } from "../../../services/api/documents.ts";
import SelectTypeDocument from "../elements/Select/SelectTypeDocument.tsx";
import { Type } from "../../../services/enums/document.type.enum.ts";
import { intDocument, intDocuments } from "../../../services/interfaces/intDocument.tsx";
import { FormEvent, InputEvent } from "../../../services/interfaces/generique.interface.tsx";

type Props = {
  setDocuments: (documents:intDocuments) => void;
  documents: intDocuments
};

export default function DocumentsAdd({ setDocuments, documents }: Props) {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intDocument>({path: "", type: 0, _id:'', project: ''});

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newDoc = await addDocumentToBDD(form);
    setDocuments([newDoc.data, ...documents])
  }

  const handleTypeDocument = (value:any) : void => {
    setForm({ ...form, type: value.value })
  }

  return (
    <div>
      <CreateButton handleClick={handleOpen} value="Ajouter" />
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
              <Button onClick={handleOpen} size={"sm"} type="submit" className={"bg-brick-300"}>
                Ajouter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
