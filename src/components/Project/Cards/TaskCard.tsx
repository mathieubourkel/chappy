/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { intTask, intTasks} from "../../../services/interfaces/intProject";
import StepModifyTask from "../Modals/StepModifyTask";
import DeleteButton from "../elements/Buttons/DeleteButton";
import StepDisplayTask from "../Modals/StepDisplayTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../elements/Select/SelectStatus";
import { Status2 } from "../../../services/interfaces/Status";
import { deleteTaskFromBDD, modifyTaskToBDD } from "../../../services/api/tasks";
import { deleteUserToTaskToBDD } from "../../../services/api/users";

type Props = {
  task: intTask;
  isOwner: boolean;
  tasks: intTasks;
  setTasks: (tasks: intTasks) => void;
  index:number
};

export default function TaskCard({ task, tasks, setTasks, isOwner, index }: Props) {

  console.log('TaskCardComposant')
  const [openM, setOpenM] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenM = () => setOpenM((bool) => !bool);
  const handleOpen = () => setOpen((bool) => !bool);
  const [oneTask, setOneTask] = useState<intTask>({...task})
  
  async function handleDelete(indexT: number) {
    const tempUsers = [...oneTask.users];
    tempUsers.splice(indexT, 1)
    console.log(oneTask)
    const tempTask =  {...oneTask, app_users: tempUsers}
    await deleteUserToTaskToBDD(oneTask.id, oneTask.users[indexT].id )
    setOneTask(tempTask);  
    
    }

    const handleDeleteTask = () => {
      deleteTaskFromBDD(task.id)
    }

    function handleModifyTask(data:intTask){
      modifyTaskToBDD(task.id, data)
    }

  return (
    <>
      {isOwner ? (
        <li
          className="md:flex justify-between gap-5
           rounded-xl p-2 mb-5 mt-10 bg-white items-center border-solid border-4 border-b-brick-200"
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex"
            onClick={handleOpen}
          >
            <p className="border p-2 rounded-xl bg-light-200">
              
              {oneTask.category.name}

            </p>
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpen}
          >
            {oneTask.name}
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpen}
          >
            {oneTask.description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <form>
              <SelectStatus
                isOwner={isOwner}
                state={task}
                classState="basis-1/2"
                handleBdd={handleModifyTask}
              />
            </form>

            <div className="flex gap-2">
              <StepModifyTask
                index={index}
                task={oneTask}
                setTask={setOneTask}
                handleOpen={handleOpen}
                open={open}
              />
              <DeleteButton handleDeleteBDD={handleDeleteTask} index={index} state={tasks} setState={setTasks} />
            </div>
          </div>
        </li>
      ) : (
        <li
          className="md:flex justify-between gap-5
         rounded-xl p-2 mb-5 mt-10 bg-white items-center border-solid border-4 border-b-brick-200"
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex"
            onClick={handleOpenM}
          >
            <p className="border p-2 rounded-xl bg-light-200">
              {oneTask.category.name}
            </p>
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {oneTask.name}
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {oneTask.description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <Typography
              variant="h5"
              className="p-2 text-brick-300"
              onClick={handleOpenM}
            >
              {Status2[oneTask.status].name}
            </Typography>
            <StepDisplayTask
              task={oneTask}
              handleOpenM={handleOpenM}
              openM={openM}
            />
          </div>
        </li>
      )}
      <div className="flex sm:gap-10" onClick={handleOpenM}>
        {oneTask.users.map((user: any, indexT: number) => (
          <div className="flex gap-2" key={indexT}>
            <p className="bg-white p-2 rounded-lg">{user.email}</p>
            {isOwner && (
              <IconButton onClick={() => handleDelete(indexT)}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
