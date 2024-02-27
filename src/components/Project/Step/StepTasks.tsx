import {Alert,IconButton,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBan,faFilter} from "@fortawesome/free-solid-svg-icons";
import StepCreateTask from "../Task/StepCreateTask";
import TaskCard from "../Task/TaskCard";
import { intStep } from "../../../services/interfaces/intStep";
import { intTask } from "../../../services/interfaces/intTask";
import { useFilterDisplay } from "../../../hooks/useFilterDisplay";

type Props = {
  step:intStep
  setStep: (step:intStep) => void;
  handleReload: () => void;
}

export default function StepTasks({step, setStep, handleReload}:Props) {

  const {filteredData, renderNextButton, renderBeforeButton, reloadFilteredData} = useFilterDisplay(5, step.tasks)

  return (
    <section className="mb-20">
      <div className="flex justify-between items-center">
          <h2>Les tâches</h2>
        <nav className="flex gap-5 items-center">
          <div>
            <StepCreateTask
              setStep={setStep}
              step={step}
              reloadFilteredData={reloadFilteredData}
            />
          </div>
          <div>
            <IconButton size={"sm"}>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </nav>
      </div>
      <div className="flex gap-5 lg:mt-10">
      <div className="flex w-[5vw] items-center">
        {renderBeforeButton()}
        </div>
            <div className="flex w-[80vw] flex-wrap gap-5 justify-center">
          {filteredData.map((task: intTask) => (
            <TaskCard
              key={task._id}
              handleReload={handleReload}
              allUsers={step.project.members ||[]}
              task={task}
            />
          ))}
          </div>
          <div className="flex w-[5vw] items-center">
          {renderNextButton()}
        </div>
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
