import {
  Alert,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import ProjectCreateStep from "../Modals/ProjectCreateStep";
import StepCard from "../Cards/StepCard";
import { intProject } from "../../../services/interfaces/intProject";
import { intStep } from "../../../services/interfaces/intStep";
import { useEffect, useState } from "react";

type Props = {
  idProject: string
  isOwner:boolean
  project: intProject
  handleReload: () => void;
};

export default function ProjectSteps({ idProject, isOwner, project, handleReload}: Props) {
  const [currentSteps, setCurrentSteps] = useState(5)
  const [firstTime, setFirstTime] = useState(false)
  const [stepsDisplay, setStepsDisplay] = useState(project.steps.slice(0,5))
  useEffect(() => {
    if(firstTime) {
      setStepsDisplay(project.steps.slice(0,5))
      setCurrentSteps(5)
    }
    setFirstTime(true)
    
  }, [project, firstTime])
  const nextOrBeforeSteps = (next: boolean) => {
    if (next) {
      setStepsDisplay(project.steps.slice(currentSteps, Math.min(currentSteps +5, project.steps.length)))
      setCurrentSteps(currentSteps +5)
    } else {
      setStepsDisplay(project.steps.slice(Math.max(0, currentSteps -10), currentSteps-5))
      setCurrentSteps(currentSteps -5)
    }
  }
  return (
    <section className="mb-20">
      <article className="flex justify-between">
          <h2>Les jalons</h2>
        <nav className="flex gap-5 items-center">
          {isOwner && (
            <div>
              <ProjectCreateStep handleReload={handleReload} />
            </div>
          )}
          <div>
            <IconButton size={"sm"}>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </nav>
      </article>

      <div className="flex gap-5 lg:mt-10">
      <div className="flex w-[5vw] items-center">
            {(currentSteps-5 !=0 && currentSteps != 0) && <IconButton className="bg-transparent text-black" onClick={() => nextOrBeforeSteps(false)}><FontAwesomeIcon icon={faChevronLeft} /></IconButton>}
            </div>
            <div className="flex flex-wrap w-[80vw] gap-5 justify-center">
          {stepsDisplay.map((step: intStep) => (
            <StepCard key={step._id} step={step} idProject={idProject} />
          ))}
          </div>
          <div className="flex w-[5vw] items-center">
              {currentSteps < project.steps.length && currentSteps+5 != project.steps.length && <IconButton className="bg-transparent text-black" onClick={() => nextOrBeforeSteps(true)}><FontAwesomeIcon icon={faChevronRight} /></IconButton>}
              </div>
        </div>
      {project.steps.length == 0 && <Alert
          icon={<FontAwesomeIcon icon={faCircleExclamation} className={"text-brick-400 text-xl"}/>}
          className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
      >
        Vous n'avez aucun jalon,

        <Typography
            variant="paragraph"
            className={"inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 ml-1"}
        >
            créer votre premier jalon.
        </Typography>
      </Alert>}
    </section>
  );
}
