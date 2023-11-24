/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, IconButton } from "@material-tailwind/react";
import { StepModifyTask } from "../Modals/StepModifyTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteButton from "../Buttons/DeleteButton";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "../Buttons/SelectInput";

export default function TaskCard({
  task,
  index,
  status,
  users,
  setUser,
  setTask,
  tasks,
  isOwner,
}: any) {
  return (
    <div>
      <li
        className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
      >
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">{task.categorie}</p>
        </Typography>
        <Typography variant="h5" className="p-2 text-brick-300">
          {task.name}
        </Typography>
        <Typography variant="h5" className="p-2 text-brick-300">
          {task.description}
        </Typography>
        <div className="pt-0 flex justify-end gap-10">
          <form>
            <SelectInput
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
            <div>
              <StepModifyTask
                task={task}
                index={index}
                tasks={tasks}
                setTask={setTask}
              />
            </div>

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
    </div>
  );
}
