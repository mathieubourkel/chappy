import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";
import {intTask,intTasks} from "../../../services/interfaces/intProject";
import { getTasksByStep } from "../../../services/api/tasks";
import { useParams } from "react-router-dom";


type Props = {
  isOwner: boolean
};

export default function StepTasks({isOwner}: Props) {
  console.log('StepTasksComposant')
  const {idStep} = useParams();
  const [tasks, setTasks] = useState<intTasks>([])

  useEffect(() => {
    async function getTasks(){
      const result = await getTasksByStep(idStep)
      setTasks(result)
    }

    getTasks();
}, [idStep]);

  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between items-center">
        <div className="b2-header-title">
          <h2>Les tâches</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
          <div>
            <StepCreateTask tasks={tasks} setTask={setTasks} />
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <ul className="b2-body mt-5">
        {tasks.map((task: intTask, index: number) => (
          <TaskCard
            index={index}
            key={index}
            isOwner={isOwner}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </ul>
    </section>
  );
}
