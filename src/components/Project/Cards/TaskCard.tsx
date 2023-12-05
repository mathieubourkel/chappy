/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { intSelect, intTask } from "../../../services/interfaces/intProject";
import StepModifyTask from "../Modals/StepModifyTask";
import StepDisplayTask from "../Modals/StepDisplayTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../elements/Select/SelectStatus";
import { enumStatus } from "../../../services/interfaces/Status";
import {
  deleteTaskFromBDD,
  getTaskById,
  modifyTaskToBDD,
} from "../../../services/api/tasks";
import { deleteUserToTaskToBDD } from "../../../services/api/users";
import DeleteButton from "../elements/Buttons/DeleteButton";

type Props = {
  id: number | undefined;
  handleReload: () => void;
  categories: Array<intSelect>;
};

let count = 1;
export default function TaskCard({ id, handleReload, categories }: Props) {
  console.log("TaskCardComposant " + count++);
  const userId: string | undefined | null = localStorage.getItem("id");

  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM((bool) => !bool);

  const [task, setTask] = useState<intTask>({
    name: "",
    status: 0,
    category: { id: 0, name: "" },
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    users: [],
    user: { id: 0 },
  });
  console.log(task);
  const [selected, setSelected] = useState<intSelect>();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function getTask() {
      const result = await getTaskById(id);
      result.user.id == userId && setIsOwner(true);
      setTask(result);
      setSelected(enumStatus[result.status]);
    }
    getTask();
  }, [id, userId]);

  async function handleDelete(indexT: number) {
    const tempUsers = [...task.users];
    tempUsers.splice(indexT, 1);
    const tempTask = { ...task, users: tempUsers };
    await deleteUserToTaskToBDD(task.id, task.users[indexT].id);
    setTask(tempTask);
  }

  const handleDeleteTask = async () => {
    await deleteTaskFromBDD(task.id);
    handleReload();
  };

  const handleStatus = async (values: intSelect) => {
    const data = { ...task, status: values.value };
    await modifyTaskToBDD(task.id, data);
    setSelected(values);
  };

  return (
    <>
      {isOwner ? (
        <li
          className="md:flex justify-between gap-5
           rounded-xl p-2 mb-5 mt-10 bg-white items-center border-solid border-4 border-b-brick-200"
        >
          <Typography variant="h5" color="blue-gray" className="flex">
            <p className="border p-2 rounded-xl bg-light-200">
              {task.category.name}
            </p>
          </Typography>
          <Typography variant="h5" className="p-2 text-brick-300">
            {task.name}
          </Typography>
          <Typography variant="h5" className="p-2 text-brick-300">
            {task.description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <form>
              <SelectStatus
                handleStatus={handleStatus}
                defaultValue={selected}
              />
            </form>

            <div className="flex gap-2">
              <StepModifyTask
                task={task}
                categories={categories}
                selected={selected}
                setSelected={setSelected}
              />
              <DeleteButton handleDeleteBDD={handleDeleteTask} />
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
              {task.category.name}
            </p>
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {task.name}
          </Typography>
          <Typography
            variant="h5"
            className="p-2 text-brick-300"
            onClick={handleOpenM}
          >
            {task.description}
          </Typography>
          <div className="md:flex justify-end gap-10">
            <Typography
              variant="h5"
              className="p-2 text-brick-300"
              onClick={handleOpenM}
            >
              {enumStatus[task.status].label}
            </Typography>
            <StepDisplayTask
              task={task}
              handleOpenM={handleOpenM}
              openM={openM}
            />
          </div>
        </li>
      )}
      <div className="flex sm:gap-10" onClick={handleOpenM}>
        {task.users.map((user: any, indexT: number) => (
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
