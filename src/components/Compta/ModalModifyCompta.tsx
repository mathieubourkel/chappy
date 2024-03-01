/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Dialog,Card,CardBody,CardFooter,Typography,Input} from "@material-tailwind/react";
import { modifyPurchaseFromBDD } from "../../services/api/compta";
import Datepicker from "react-tailwindcss-datepicker";
import SelectStatus from "../elements/Select/SelectStatus";
import { intCompta } from "../../services/interfaces/intCompta";
import { FormEvent, InputEvent} from "../../services/interfaces/generique.interface";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";

type Props = {
  compta: intCompta
  setStateCompta:(compta:intCompta) => void;
  open: boolean
  handleOpen:() => void;
};

export default function ModalModifyCompta({ compta, setStateCompta, open, handleOpen }: Props) {
  const [form, setForm] = useState<intCompta>({ ...compta });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handlePrice = (e: InputEvent) => {
    setForm({ ...form, price: { fullTaxPrice: +e.target.value, devise: 0 } });
  };

  const handleDate2 = (value: any) => {
    setForm({ ...form, deliveryDate: value.startDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  const handleDate = (value: any) => {
    setForm({ ...form, commandDate: value.startDate });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tmpCompta = await modifyPurchaseFromBDD(form._id ||'', form);
    setStateCompta(tmpCompta.data)
    handleOpen()
  };

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
              <Typography
                variant="h3"
                className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Modifier un document
              </Typography>
              <Input
                label="Description de l'achat"
                size="lg"
                className={"border-select"}
                name="description"
                id="description"
                value={form.description}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Input
                label="Prix de l'achat"
                type="number"
                className={"border-select"}
                size="lg"
                value={form.price.fullTaxPrice}
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
              <MagicButton type={ButtonTypeEnum.MODIFY}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
