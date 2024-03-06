/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,ButtonGroup,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteUserToTaskToBDD, modifyTaskToBDD } from "../../services/api/tasks";
import { CategoriesEnum } from "../../services/enums/categories.enum";
import { intTask } from "../../services/interfaces/intTask";
import { FormEvent, intSelects} from "../../services/interfaces/generique.interface";
import { Status} from "../../services/enums/status.enum";
import { useMagicForm } from "../../hooks/useMagicForm";
import MagicInput from "../elements/Input/MagicInput";
import MagicSelect from "../elements/Select/MagicSelect";
import SelectDate from "../elements/Select/SelectDate";
import MagicMultipleSelect from "../elements/Select/MagicMultipleSelect";
import { TaskSchema } from "../../services/schemas/task.schema";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  task: intTask;
  allUsers: intSelects;
  setTask: (task:intTask) => void;
  open: boolean,
  handleOpen:() => void;
};

export default function ModalModifyTask({ task, allUsers, setTask, open, handleOpen}: Props) {
  const {form, handleSetForm, handleChange, handleSelect, handleDate, handleMultiple, validateForm, renderErrors} = useMagicForm()
  
  useEffect(() => {
      handleSetForm(task)
  }, [task])

  const updatedAllUsers:any = allUsers.filter(user => !task.members?.some(taskUser => taskUser.id === user.value));
  const handleDeleteUser = async (idUser:number) => {
    await deleteUserToTaskToBDD( task._id ||'', idUser)
    const updatedMembers = task.members?.filter(item => item.id !== idUser);
    setTask({...task, members: updatedMembers})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(TaskSchema)) return;
    const tmpMembers:any = [...form.members, ...task.members ||[]]
    const newTask = await modifyTaskToBDD(task._id || '', {...form, members: tmpMembers});
    setTask(newTask.data)
    handleOpen()
  };

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className={`mx-auto mt-20 bg-transparent shadow-none fixed inset-0 flex items-center justify-center overflow-y-auto ${open ? 'block' : 'hidden'}`}>
    <Card className={`custom-modal rounded-br-none rounded-tr-none overflow-y-auto max-h-[80vh] custom-scroll`}>
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
            Modifier la tâche
          </Typography>
              <MagicInput name="name" value={form.name} label="Nom de la tâche" handleChange={handleChange} renderErrors={renderErrors}/>
              <MagicInput name="description" value={form.description} label="Description" handleChange={handleChange} renderErrors={renderErrors} type='text' />
              <MagicInput name='budget' label='Budget' value={form.budget} type='number' handleChange={handleChange} renderErrors={renderErrors}/>
              <MagicSelect options={Status} value={Status[form.status]} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
              <MagicSelect options={CategoriesEnum} handleSelect={handleSelect} label='category' placeholder='Catégorie' renderErrors={renderErrors}/>
              <SelectDate value1={form.startDate} value2={form.endDate} handleDate={handleDate} label='startDate' label2='endDate'
                  placeholder='Choisir la durée de la tâche' 
                  renderErrors={renderErrors}
                />
              <Typography variant="h4" className={"text-marine-300 text-lg font-extrabold mt-3"}>
                Participants
              </Typography>
              <div className={"flex gap-2 justify-center flex-wrap"}>
                {task.members && task.members.map((user: any, indexT: number) => (
                  <ButtonGroup key={indexT} size={"sm"} className={"divide-light-100/50 mb-2"}>
                    <Button>{user.email}</Button>
                      <Button onClick={() => handleDeleteUser(user.id)}>
                          <FontAwesomeIcon icon={faXmark} size="sm"/>
                      </Button>
                  </ButtonGroup>
                ))}
            </div>
            <MagicMultipleSelect options={updatedAllUsers} handleMultiple={handleMultiple} label='members' 
                  placeholder='Ajouter des participants à la tâche' alias='email'/>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.MODIFY}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
