import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, InputEvent, intProjectForPurchases, intPurchase, intPurchases } from "../../../services/interfaces/intProject";
import './modal.css'

type Props = {
  project: intProjectForPurchases
  setProject: (project: intProjectForPurchases) => void;
  index:number
};

export default function PurchaseModify({ project, setProject, index}: Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intPurchase>({...purchases[index]});

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tempArray:intPurchases = [...purchases];
    tempArray[index] = form;
    setPurchase(tempArray);
  }

  return (
    <div>
      <IconButton
        className="bg-brick-300 flex items-center"
        size={"sm"}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPen}
        size={"sm"}/>
      </IconButton>
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
                Modifier un document
              </Typography>
              <Input
                label="Nom de l'achat"
                size="lg"
                className={"border-select"}
                name="name"
                id="name"
                value={form.name}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Input
                label="Prix de l'achat"
                type="number"
                className={"border-select"}
                size="lg"
                value={form.price}
                name="price"
                id="price"
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
