/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import { addTaskToStepToBDD } from "../../services/api/tasks";
import { useParams } from "react-router-dom";
import { intStep } from "../../services/interfaces/intStep";
import { FormEvent } from "../../services/interfaces/generique.interface";
import { ManageWebSocket } from "../../services/utils/ManageWebSocket";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import { useMagicForm } from "../../hooks/useMagicForm";
import { TaskSchema } from "../../services/schemas/task.schema";
import { Status } from "../../services/enums/status.enum";
import { CategoriesEnum } from "../../services/enums/categories.enum";
import MagicSelect from "../elements/Select/MagicSelect";
import MagicMultipleSelect from "../elements/Select/MagicMultipleSelect";
import MagicInput from "../elements/Input/MagicInput";
import SelectDate from "../elements/Select/SelectDate";

type Props = {
  step: intStep;
  setStep: (step:intStep) => void;
  reloadFilteredData: (newData: any[]) => void;
  open:boolean;
  handleOpen: () => void;
};

export default function ModalCreateTask({setStep, step, reloadFilteredData, open, handleOpen}: Props) {
  const { idStep, idProject } = useParams();
  const {form, handleChange, handleSelect, handleDate, handleMultiple, validateForm, renderErrors} = useMagicForm()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(TaskSchema)) return;
    const newTask = await addTaskToStepToBDD({...form, project:idProject, step:idStep});
    const tmpArray:any = []
    newTask.data.members.map((member:any) => {
      tmpArray.push(member.id.toString())
    })
    new ManageWebSocket().sendMessage(`Vous avez été invité sur la tâche ${form.name}`, tmpArray) 
    handleOpen();
    const newTasksArray = [newTask.data, ...step.tasks]
    setStep({...step, tasks: newTasksArray})
    reloadFilteredData(newTasksArray)
  }

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className={`mx-auto mt-20 bg-transparent shadow-none fixed inset-0 flex items-center justify-center overflow-y-auto ${open ? 'block' : 'hidden'}`}>
    <Card className={`custom-modal rounded-br-none rounded-tr-none overflow-y-auto max-h-[80vh] custom-scroll`}>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center mb-5">
              Créer une tâche
            </Typography>
            <MagicInput name="name" label="Nom de la tâche" handleChange={handleChange} renderErrors={renderErrors}/>
            <MagicInput name="description" label="Description" handleChange={handleChange} renderErrors={renderErrors} type='text' />
            <MagicInput name='budget' label='Budget' type='number' handleChange={handleChange} renderErrors={renderErrors}/>
            <MagicSelect options={Status} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
            <MagicSelect options={CategoriesEnum} handleSelect={handleSelect} label='category' placeholder='Catégorie' renderErrors={renderErrors}/>
            <SelectDate value1={form.startDate} value2={form.endDate} handleDate={handleDate} label='startDate' label2='endDate'
                placeholder='Choisir la durée de la tâche' 
                renderErrors={renderErrors}
              />
            <MagicMultipleSelect options={step.project.members|| []} handleMultiple={handleMultiple} label='members' 
                placeholder='Ajouter des participants à la tâche' alias='email'/>
          </CardBody>
          <CardFooter className="pt-0 flex justify-center">
            <MagicButton type={ButtonTypeEnum.CREATE}/>
          </CardFooter>
        </form>
        </Card>
      </Dialog>
  );
}
