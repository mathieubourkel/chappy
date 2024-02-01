/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  FormEvent,
  InputEvent,
  intDocument,
} from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import { addDocumentToBDD } from "../../../services/api/documents";
import { useParams } from "react-router-dom";
import './modal.css'
import SelectTypeDocument from "../elements/Select/SelectTypeDocument.tsx";
import { Type } from "../../../services/enums/document.type.enum.ts";
import { formatDate } from "../../../services/utils/FormatDate.tsx";

type Props = {
  handleReload: () => void;
};

export default function DocumentsAdd({ handleReload }: Props) {

  const {idProject} = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intDocument>({path: "", type: 0, id:0, project: Number(idProject)});

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(form)
    await addDocumentToBDD(form);
    handleReload();
    
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
