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
import { FormEvent, InputEvent, intPurchase } from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import { useParams } from "react-router-dom";
import { addPurchaseToBDD } from "../../../services/api/compta";
import './modal.css'
import Datepicker from "react-tailwindcss-datepicker";
import SelectStatus from "../elements/Select/SelectStatus";
import { formatDate } from "../../../services/utils/FormatDate";

type Props = {
  handleReload: () => void;
};

export default function PurchaseAdd({ handleReload }: Props) {
  const date = new Date()
  const {idProject} = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intPurchase>({
    description: "", price:{fullTaxPrice:0, devise:0},
    deliveryDate: formatDate(date), commandDate: formatDate(date),
    status:0, refId: idProject, refModel:0
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleDate = (value: any) => {
    setForm({ ...form, commandDate: value.startDate });
  };

  const handlePrice = (e:InputEvent) => {
    setForm({ ...form, price: {fullTaxPrice: +e.target.value, devise:0} });
  };
  const handleDate2 = (value: any) => {
    setForm({ ...form, deliveryDate: value.startDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(form)
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
                label="Description de l'achat"
                size="lg"
                className={"border-select"}
                name="description"
                id="description"
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
                onChange={(e: InputEvent) => handlePrice(e)}
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
