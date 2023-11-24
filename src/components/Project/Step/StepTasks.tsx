/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@material-tailwind/react";
import {
  intTask,
  intTasks,
  intUsers,
} from "../../../services/interfaces/intProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { StepCreateTask } from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";

type Props = {
  tasks: intTasks;
  setTask: (tasks: intTasks) => void;
  users: intUsers;
  setUser: (user: intUsers) => void;
  status: Array<string>;
  isOwner: boolean
};

export default function Steps({
  tasks,
  setTask,
  users,
  setUser,
  status,
  isOwner
}: Props) {
  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les tâches</h2>
        </div>
        <div className="b2-header-buttons flex">
          <div>
            <StepCreateTask tasks={tasks} setTask={setTask} />
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <ul className="b2-body flex flex-col gap-10 mt-5">
        {tasks.map((task: intTask, index: number) => (
          <TaskCard
            task={task}
            key={index}
            index={index}
            tasks={tasks}
            setTask={setTask}
            status={status}
            users={users}
            setUser={setUser}
            isOwner={isOwner}
          />
        ))}
      </ul>
    </section>
  );
}
