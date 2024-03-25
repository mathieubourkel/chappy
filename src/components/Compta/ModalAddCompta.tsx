/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { addPurchaseToBDD } from "../../services/api/compta";
import {  FormEvent } from "../../services/interfaces/generique.interface";
import {  intComptas } from "../../services/interfaces/intCompta";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { useMagicForm } from "../../hooks/useMagicForm";
import MagicInput from "../elements/Input/MagicInput";
import SelectDate from "../elements/Select/SelectDate";
import { Status } from "../../services/enums/status.enum";
import MagicSelect from "../elements/Select/MagicSelect";
import { ComptaSchema } from "../../services/schemas/compta.schema";

type Props = {
  setComptas: (comptas:intComptas) => void;
  comptas: intComptas
  open: boolean
  handleOpen: () => void;
};

export default function ModalAddCompta({ comptas, setComptas, open, handleOpen }: Props) {

  const {idProject} = useParams();
  const {form, handleChange, handleSelect, handleDate, validateForm, renderErrors} = useMagicForm()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(ComptaSchema)) return;
    const newCompta = await addPurchaseToBDD({...form, refId:idProject, refModel:0, price: +form.price});
    setComptas([newCompta.data, ...comptas])
    handleOpen()
  }

  return (
      <Dialog size="sm" open={open} handler={handleOpen} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Ajouter un achat
              </Typography>
              <MagicInput name="description" label="Description de l'achat" handleChange={handleChange} renderErrors={renderErrors}/>
              <MagicInput name='price' label='Budget' type='number' handleChange={handleChange} renderErrors={renderErrors}/>
              <SelectDate 
                value1={form.commandDate} handleDate={handleDate} label='commandDate'
                placeholder='Choisir la date de commande' 
                renderErrors={renderErrors}
                />
                <SelectDate 
                value1={form.deliveryDate} handleDate={handleDate} label='deliveryDate'
                placeholder='Choisir la date de livraison' 
                renderErrors={renderErrors}
                />
               <MagicSelect options={Status} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.ADD} />
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
