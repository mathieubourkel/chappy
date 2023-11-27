import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectCreateStep from "../Modals/ProjectCreateStep";
import StepCard from "../Cards/StepCard";
import { intStep, intSteps } from "../../../services/interfaces/intProject";

type Props = {
  steps: intSteps;
  setStep: (steps: intSteps) => void;
  isOwner: boolean
};

export default function ProjectSteps({ steps, setStep, isOwner }: Props) {
  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les jalons</h2>
        </div>
        <div className="b2-header-buttons flex">
          {isOwner && 
          <div>
            <ProjectCreateStep steps={steps} setStep={setStep} />
          </div> }
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="b2-body flex flex-wrap gap-10 mt-10">
        {steps.map((step: intStep, index: number) => (
          <StepCard key={index} step={step} />
        ))}
      </div>
    </section>
  );
}
