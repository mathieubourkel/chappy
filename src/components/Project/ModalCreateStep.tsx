/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { intProject } from "../../services/interfaces/intProject"
import { addProjectStepToBDD } from "../../services/api/steps";
import { FormEvent } from "../../services/interfaces/generique.interface";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { Status } from "../../services/enums/status.enum";
import { StepSchema } from "../../services/schemas/step.schema";
import { useMagicForm } from "../../hooks/useMagicForm";
import MagicInput from "../elements/Input/MagicInput";
import SelectDate from "../elements/Select/SelectDate";
import MagicSelect from "../elements/Select/MagicSelect";

type Props = {
  setProject: (project:intProject) => void;
  project: intProject
  reloadFilteredData: (newData:any[]) => void;
  open:boolean;
  handleOpen: () => void;
};

export default function ModalCreateStep({ setProject, project, reloadFilteredData, open ,handleOpen }: Props) {

  const { idProject } = useParams();
  const {form, handleChange, handleSelect, handleDate, validateForm, renderErrors} = useMagicForm()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(StepSchema)) return;
    const newStep = await addProjectStepToBDD({...form, project: idProject ||''});
    const newStepsArray = [newStep.data, ...project.steps]
    setProject({...project, steps: newStepsArray})
    reloadFilteredData(newStepsArray)
    handleOpen()
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className={`mx-auto mt-20 bg-transparent shadow-none fixed inset-0 flex items-center justify-center overflow-y-auto ${open ? 'block' : 'hidden'}`}>
    <Card className={`custom-modal rounded-br-none rounded-tr-none overflow-y-auto max-h-[80vh] custom-scroll`}>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Créer un jalon
              </Typography>
              <MagicInput name="name" label="Nom du jalon" handleChange={handleChange} renderErrors={renderErrors}/>
              <MagicInput name="description" label="Description" handleChange={handleChange} renderErrors={renderErrors} type='text' />
              <div className="flex gap-3 flex-wrap">
              <MagicInput name='budget' label='Budget' type='number' handleChange={handleChange} renderErrors={renderErrors}/>
              <SelectDate 
                value1={form.estimEndDate} handleDate={handleDate} label='estimEndDate'
                placeholder='Choisir la date de fin estimée du jalon' 
                renderErrors={renderErrors}
                />
              </div>
              <MagicSelect options={Status} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.CREATE}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
