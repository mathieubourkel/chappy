import {
  Alert,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";
import { intStep } from "../../../services/interfaces/intStep";
import { intTask } from "../../../services/interfaces/intTask";

type Props = {
  step:intStep
  handleReload: () => void;
}

export default function StepTasks({step, handleReload}:Props) {

  return (
    <section className="mb-20">
      <div className="flex justify-between items-center">
          <h2>Les tâches</h2>
        <nav className="flex gap-5 items-center">
          <div>
            <StepCreateTask
              handleReload={handleReload}
              step={step}
            />
          </div>
          <div>
            <IconButton size={"sm"}>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </nav>
      </div>
        <div className="mt-10">
          {step.tasks.map((task: intTask) => (
            <TaskCard
              key={task._id}
              handleReload={handleReload}
              allUsers={step.project.members}
              task={task}
            />
          ))}
        </div>

      {step.tasks.length == 0 && <><Alert
          icon={<FontAwesomeIcon icon={faBan} className={"text-marine-300 text-xl"}/>}
          className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
      >
        Aucune tâche en cours.
      </Alert></>}
    </section>
  );
}
