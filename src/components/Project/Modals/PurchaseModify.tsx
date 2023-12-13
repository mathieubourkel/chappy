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
import { FormEvent, InputEvent, intPurchase, intPurchases } from "../../../services/interfaces/intProject";
import './modal.css'

type Props = {
  purchases: intPurchases
  setPurchase: (purchases: intPurchases) => void;
  index:number
};

export default function PurchaseModify({ purchases, setPurchase, index}: Props) {

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
    
  useEffect(() => {
    setForm({ ...purchases[index] });
  }, [index, open, purchases]);

  return (
    <div>
      <IconButton
        className="mr-5 bg-brick-300 flex items-center"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" color="blue-gray">
                Modifier un achat
              </Typography>
              <Input
                label="Nom de l'achat"
                size="lg"
                name="name"
                id="name"
                value={form.name}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Input
                label="Prix de l'achat"
                type="number"
                size="lg"
                value={form.price}
                name="price"
                id="price"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button variant="gradient" onClick={handleOpen} type="submit">
                Ajouter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
