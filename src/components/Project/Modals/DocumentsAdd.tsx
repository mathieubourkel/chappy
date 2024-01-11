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
import { FormEvent, InputEvent, intDocument } from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import { addDocumentToBDD } from "../../../services/api/documents";
import { useParams } from "react-router-dom";
import './modal.css'

type Props = {
  handleReload: () => void;
};

export default function DocumentsAdd({ handleReload }: Props) {

  const {idProject} = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intDocument>({
    path: "", type: "", project: {id: idProject, code:''}
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await addDocumentToBDD(form);
    handleReload();
    
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
              <Input
                label="Type du document"
                size="lg"
                name="type"
                id="type"
                className={"border-select"}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
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
