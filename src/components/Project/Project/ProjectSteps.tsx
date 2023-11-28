import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectCreateStep from "../Modals/ProjectCreateStep";
import StepCard from "../Cards/StepCard";
import { intStep, intSteps } from "../../../services/interfaces/intProject";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  isOwner: boolean
  idProject: string | undefined
};

export default function ProjectSteps({ isOwner, idProject }: Props) {

  const [error, setError] = useState(null);
  const [steps, setStep] = useState<intSteps>([]);

  useEffect(() => {
    axios
    .get(
      "http://localhost:1337/api/project-steps?populate[0]=project&filters[project][id][$eq]=" +
        idProject
    )
      .then(({ data }) => setStep(data.data))
      .catch((error) => setError(error));
  }, [idProject]);
  console.log(steps)

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les jalons</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
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
          <StepCard key={index} step={step} id={steps[index].id} />
        ))}
      </div>
    </section>
  );
}
