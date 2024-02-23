import {
  Alert,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faChevronDown,
  faChevronUp,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";
import { intStep } from "../../../services/interfaces/intStep";
import { intTask } from "../../../services/interfaces/intTask";
import { useEffect, useState } from "react";

type Props = {
  step:intStep
  handleReload: () => void;
}

export default function StepTasks({step, handleReload}:Props) {
  const [tasksDisplay, setTasksDisplay] = useState(step.tasks.slice(0,5))
  const [current, setCurrent] = useState(5)
  const [firstTime, setFirstTime] = useState(false)

  useEffect(() => {
    if(firstTime) {
      setTasksDisplay(step.tasks.slice(0,5))
      setCurrent(5)
    }
    setFirstTime(true)
    
  }, [step.tasks, firstTime])

  const nextOrBefore = (next: boolean) => {
    if (next) {
      setTasksDisplay(step.tasks.slice(current, Math.min(current +5, step.tasks.length)))
      setCurrent(current +5)
    } else {
      setTasksDisplay(step.tasks.slice(Math.max(0, current -10), current-5))
      setCurrent(current -5)
    }
  }

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
        {(current-5 !=0 && current != 0) && <IconButton className='mx-10' onClick={() => nextOrBefore(false)}><FontAwesomeIcon icon={faChevronUp} /></IconButton>}
          {tasksDisplay.map((task: intTask) => (
            <TaskCard
              key={task._id}
              handleReload={handleReload}
              allUsers={step.project.members ||[]}
              task={task}
            />
          ))}
          {current < step.tasks.length && current+5 != step.tasks.length  && <IconButton className='mx-10' onClick={() => nextOrBefore(true)}><FontAwesomeIcon icon={faChevronDown} /></IconButton>}
        </div>

      {step.tasks.length == 0 && <><Alert
          icon={<FontAwesomeIcon icon={faBan} className={"text-brick-300 text-xl"}/>}
          className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
      >
        Aucune tâche en cours.
      </Alert></>}
    </section>
  );
}
