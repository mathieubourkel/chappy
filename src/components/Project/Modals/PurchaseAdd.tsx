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
import { FormEvent, InputEvent, intCreatePurchase } from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import { useParams } from "react-router-dom";
import { addPurchaseToBDD } from "../../../services/api/purchases";
import './modal.css'
import Datepicker from "react-tailwindcss-datepicker";
import SelectStatus from "../elements/Select/SelectStatus";

type Props = {
  handleReload: () => void;
};

export default function PurchaseAdd({ handleReload }: Props) {

  const {idProject} = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intCreatePurchase>({
    name: "", price:0,
    ref:'', deliveryDate: new Date(), commandDate: new Date(),
    status:0, project: Number(idProject)
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleDate = (value: any) => {
    setForm({ ...form, commandDate: value.startDate });
  };
  const handleDate2 = (value: any) => {
    setForm({ ...form, deliveryDate: value.startDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await addPurchaseToBDD(form);
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
                Ajouter un achat
              </Typography>
              <Input
                label="Nom de l'achat"
                size="lg"
                className={"border-select"}
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Input
                label="Prix de l'achat"
                type="number"
                size="lg"
                className={"border-select"}
                name="price"
                id="price"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Input
                label="Référence de la commande"
                size="lg"
                className={"border-select"}
                name="ref"
                id="ref"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black border-select"
                  onChange={handleDate}
                  value={{
                    startDate: form.commandDate,
                    endDate: form.commandDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la date de commande"}
                />
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black border-select"
                  onChange={handleDate2}
                  value={{
                    startDate: form.deliveryDate,
                    endDate: form.deliveryDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la date de livraison"}
                />
                <SelectStatus handleStatus={handleStatus} />
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
