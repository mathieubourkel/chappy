import { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { intTasks, intUser } from "../../../services/interfaces/intProject";
import StepModifyTask from "../Modals/StepModifyTask";
import DeleteButton from "../Buttons/DeleteButton";
import StepDisplayTask from "../Modals/StepDisplayTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../Buttons/SelectStatus";
type Props = {
  index: number;
  setTask: (tasks: intTasks) => void;
  tasks: intTasks;
  isOwner: boolean;
};

export default function TaskCard({ index, setTask, tasks, isOwner }: Props) {

  const [openM, setOpenM] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenM = () => setOpenM((bool) => !bool);
  const handleOpen = () => setOpen((bool) => !bool);

  function handleDelete(index: number, indexT: number) {
    const tempUsers = [...tasks[index].app_users];
    tempUsers.splice(indexT, 1)
    const tempTask =  {...tasks[index], app_users: tempUsers}
    const tempTasks = [...tasks];
    tempTasks[index] = tempTask
    setTask(tempTasks);  
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
                state={tasks}
                classState="basis-1/2"
                index={index}
              />
            </form>

            <div className="flex gap-2">
              <StepModifyTask
                index={index}
                tasks={tasks}
                setTask={setTask}
                handleOpen={handleOpen}
                open={open}
              />
              <DeleteButton index={index} state={tasks} setState={setTask} />
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
              {tasks[index].status}
            </Typography>
            <StepDisplayTask
              index={index}
              tasks={tasks}
              handleOpenM={handleOpenM}
              openM={openM}
            />
          </div>
        </li>
      )}
      <div className="flex sm:gap-10" onClick={handleOpenM}>
        {tasks[index].app_users.map((user: intUser, indexT: number) => (
          <div className="flex gap-2" key={indexT}>
            <p className="bg-white p-2 rounded-lg">{user.email}</p>
            {isOwner && (
              <IconButton onClick={() => handleDelete(index, indexT)}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
