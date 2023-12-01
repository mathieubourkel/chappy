/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { intTask, intTasks} from "../../../services/interfaces/intProject";
import StepModifyTask from "../Modals/StepModifyTask";
import DeleteButton from "../Buttons/DeleteButton";
import StepDisplayTask from "../Modals/StepDisplayTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../Buttons/SelectStatus";
import { Status2 } from "../../../services/interfaces/Status";
import { deleteTaskFromBDD } from "../../../services/api/tasks";

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
  
  function handleDelete(indexT: number) {
    const tempUsers = [...oneTask.app_users];
    tempUsers.splice(indexT, 1)
    const tempTask =  {...oneTask, app_users: tempUsers}
    setOneTask(tempTask);  
    }

    const handleDeleteTask = () => {
      deleteTaskFromBDD(task.id)
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
              {tasks[index].category.name}
            </p>
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpen}
          >
            {tasks[index].name}
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpen}
          >
            {tasks[index].description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <form>
              <SelectStatus
                isOwner={isOwner}
                state={task}
                classState="basis-1/2"
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
              {tasks[index].category.name}
            </p>
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {tasks[index].name}
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {tasks[index].description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <Typography
              variant="h5"
              className="p-2 text-brick-300"
              onClick={handleOpenM}
            >
              {Status2[tasks[index].status].name}
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
        {tasks[index].app_users.map((user: any, indexT: number) => (
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
