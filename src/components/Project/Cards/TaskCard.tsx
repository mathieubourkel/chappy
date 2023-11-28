import { useState } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { intTasks, intUsers } from "../../../services/interfaces/intProject";
import StepModifyTask from "../Modals/StepModifyTask";
import DeleteButton from "../Buttons/DeleteButton";
import SelectInputArray from "../Buttons/SelectInputArray";

type Props = {
  index: number;
  setTask: (tasks: intTasks) => void;
  tasks: intTasks;
  isOwner: boolean;
};

export default function TaskCard({ index, setTask, tasks, isOwner }: Props) {

  const status: Array<string> = ["En cours", "En attente", "Terminée"];
  const [users, setUser] = useState<intUsers>(["Pierre", "Paul", "Jack"]);

  return (
    <>
      <li
        className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
      >
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            {tasks[index].categorie}
          </p>
        </Typography>
        <Typography variant="h5" className="p-2 text-brick-300">
          {tasks[index].name}
        </Typography>
        <Typography variant="h5" className="p-2 text-brick-300">
          {tasks[index].description}
        </Typography>
        <div className="pt-0 flex justify-end gap-10">
          <form>
            <SelectInputArray
              select={status}
              isOwner={isOwner}
              state={tasks}
              setState={setTask}
              classState="basis-1/2"
              label="status"
              index={index}
            />
          </form>

          <div className="flex gap-2">
            <StepModifyTask index={index} tasks={tasks} setTask={setTask} />
            <IconButton
              variant="outlined"
              className="text-brick-300 border-brick-300"
            >
              <FontAwesomeIcon icon={faStar} />
            </IconButton>
            <DeleteButton index={index} state={tasks} setState={setTask} />
          </div>
        </div>
      </li>
      <div className="flex gap-10 mt-3">
        {users.map((user: string, indexT: number) => (
          <div className="flex gap-2" key={indexT}>
            <p className="bg-white p-2 rounded-lg">{user}</p>
            <DeleteButton index={indexT} state={users} setState={setUser} />
          </div>
        ))}
      </div>
    </>
  );
}
