/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect} from "react";
import {Dialog,Card,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import { modifyPurchaseFromBDD } from "../../services/api/compta";
import { intCompta } from "../../services/interfaces/intCompta";
import { FormEvent} from "../../services/interfaces/generique.interface";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import SelectDate from "../elements/Select/SelectDate";
import MagicInput from "../elements/Input/MagicInput";
import { Status } from "../../services/enums/status.enum";
import MagicSelect from "../elements/Select/MagicSelect";
import { ComptaSchema } from "../../services/schemas/compta.schema";
import { useMagicForm } from "../../hooks/useMagicForm";

type Props = {
  compta: intCompta
  setStateCompta:(compta:intCompta) => void;
  open: boolean
  handleOpen:() => void;
};

export default function ModalModifyCompta({ compta, setStateCompta, open, handleOpen }: Props) {

  const {form, handleSetForm, handleChange, handleSelect, handleDate, validateForm, renderErrors} = useMagicForm()
  
  useEffect(() => {
    handleSetForm({...compta, price: compta.price.fullTaxPrice})
  }, [compta])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(ComptaSchema)) return;
    const tmpCompta = await modifyPurchaseFromBDD(form._id ||'', {...form, price:{fullTaxPrice: form.price}});
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
              <MagicInput value={form.description} name="description" label="Description de l'achat" handleChange={handleChange} renderErrors={renderErrors}/>
              <MagicInput value={form.price} name='price' label='Budget' type='number' handleChange={handleChange} renderErrors={renderErrors}/>
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
               <MagicSelect value={form.status} options={Status} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
            </CardBody>
            
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.MODIFY}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
