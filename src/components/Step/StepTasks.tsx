import {Alert} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import { intStep } from "../../services/interfaces/intStep";
import { intTask } from "../../services/interfaces/intTask";
import { useFilterDisplay } from "../../hooks/useFilterDisplay";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { useState } from "react";
import MagicIconButton from "../elements/Buttons/MagicIconButton";
import CardTaskOwner from "../Task/CardTaskOwner";
import CardTask from "../Task/CardTask";
import ModalCreateTask from "../Task/ModalCreateTask";

type Props = {
  step:intStep
  setStep: (step:intStep) => void;
  handleReload: () => void;
}

export default function StepTasks({step, setStep, handleReload}:Props) {
  const userId: string = localStorage.getItem("id") || ""
  const {filteredData, renderNextButton, renderBeforeButton, reloadFilteredData} = useFilterDisplay(5, step.tasks)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <section className="mb-20">
      <div className="flex justify-between items-center">
          <h2>Les tâches</h2>
        <nav className="flex gap-5 items-center">
        
          <div>
            <MagicButton type={ButtonTypeEnum.CREATE} handleClick={handleOpen} wrap='xl'/>
            <ModalCreateTask
              setStep={setStep}
              step={step}
              reloadFilteredData={reloadFilteredData}
              open={open}
              handleOpen={handleOpen}
            />
          </div>
          <div>
            <MagicIconButton type={ButtonTypeEnum.FILTER}/>
          </div>
        </nav>
      </div>
      <div className="flex gap-5 lg:mt-10">
      <div className="flex w-[5vw] items-center">
        {renderBeforeButton()}
        </div>
            <div className="flex w-[80vw] flex-wrap gap-5 justify-center">
          {filteredData.map((task: intTask) => (
            <div key ={task._id} className='w-full'>
              {(task.owner && task.owner.id == +userId) 
               ? <CardTaskOwner handleReload={handleReload} allUsers={step.project.members ||[]} task={task}/>
               : <CardTask allUsers={step.project.members ||[]} task={task}/>}
            </div>
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
