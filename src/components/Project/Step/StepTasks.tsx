import { useEffect, useState } from "react";
import { IconButton, Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Modals/StepCreateTask";
import TaskCard from "../Cards/TaskCard";
import {
  intCategory,
  intSelect,
  intTask,
  intTasks,
} from "../../../services/interfaces/intProject";
import { useParams } from "react-router-dom";
import { getTasksByStepId } from "../../../services/api/steps";
import { getCategories } from "../../../services/api/category";

let count = 1;
export default function StepTasks() {
  console.log("StepTasksComposant " + count++);
  const { idStep } = useParams();
  const [tasks, setTasks] = useState<intTasks>([]);
  const [categories, setCategories] = useState<Array<intSelect>>([]);
  const [reload, setReload] = useState(false);
  const [busy, setBusy] = useState<boolean>(true);

  useEffect(() => {
    async function getTasks() {
      const result = await getTasksByStepId(idStep);
      const dataCategories = await getCategories();
      setBusy(false);
      const dataCategoriesReformat: Array<intSelect> = [];
      dataCategories.map((element: intCategory) => {
        dataCategoriesReformat.push({ label: element.name, value: element.id });
      });
      setCategories(dataCategoriesReformat);
      setTasks(result.step_tasks);
    }

    getTasks();
  }, [idStep, reload]);

  const handleReload = () => {
    setReload((cur) => !cur);
  };

  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between items-center">
        <div className="b2-header-title">
          <h2>Les tâches</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
          <div>
            <StepCreateTask
              handleReload={handleReload}
              categories={categories}
            />
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <ul className="b2-body mt-5">
          {tasks.map((task: intTask) => (
            <TaskCard
              key={task.id}
              id={task.id}
              handleReload={handleReload}
              categories={categories}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
