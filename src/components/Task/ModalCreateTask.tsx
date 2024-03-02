/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,CardFooter,Typography,Input,Textarea,} from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
import { addTaskToStepToBDD } from "../../services/api/tasks";
import { useParams } from "react-router-dom";
import { intStep } from "../../services/interfaces/intStep";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface";
import { ManageWebSocket } from "../../services/utils/ManageWebSocket";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import { useMagicForm } from "../../hooks/useMagicForm";
import { TaskSchema } from "../../services/schemas/task.schema";
import { Status } from "../../services/enums/status.enum";
import { CategoriesEnum } from "../../services/enums/categories.enum";
import MagicSelect from "../elements/Select/MagicSelect";
import MagicMultipleSelect from "../elements/Select/MagicMultipleSelect";

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
  console.log(step.project.members)
  return (
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography
                variant="h3"
                className={
                  "text-marine-300 text-xl font-extrabold text-center mb-5"
                }
              >
                Créer une tâche
              </Typography>
              <Input
                label="Nom de la tâche"
                className={"bg-select focus:!b-brick-300"}
                size="lg"
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              {renderErrors('name')}
              <Textarea
                label="Description"
                size="lg"
                className={"bg-select"}
                name="description"
                id="description"
                onChange={(e: any) => handleChange(e)}
              />
              {renderErrors('description')}
              <Input
                label="Budget"
                size="lg"
                className={"bg-select"}
                crossOrigin={undefined}
                type="number"
                name="budget"
                id="budget"
                onChange={(e: InputEvent) => handleChange(e)}
              />
              {renderErrors('budget')}
              <MagicSelect options={Status} handleSelect={handleSelect} label='status' placeholder='Status'/>
              {renderErrors('status')}
              <MagicSelect options={CategoriesEnum} handleSelect={handleSelect} label='category' placeholder='Catégorie'/>
              {renderErrors('category')}
              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal border-select bg-select placeholder:text-text-100 text-sm placeholder:text-sm"
                  onChange={(value:any) => handleDate(value, 'startDate', 'endDate')}
                  value={{ startDate: form.startDate, endDate: form.endDate }}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
                {renderErrors('endDate')}
              </div>
              <MagicMultipleSelect options={step.project.members|| []} handleMultiple={handleMultiple} label='members' placeholder='Ajouter des participants à la tâche' alias='email'/>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.CREATE}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
