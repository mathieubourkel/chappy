import { IconButton, Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectCreateStep from "../Modals/ProjectCreateStep";
import StepCard from "../Cards/StepCard";
import { intStep, intSteps } from "../../../services/interfaces/intProject";
import { getStepsByIdProject } from "../../../services/api/steps";
import { useEffect, useState } from "react";

type Props = {
  idProject: string | undefined
  isOwner:boolean
};

export default function ProjectSteps({ idProject, isOwner }: Props) {
  console.log("ProjectStepsComposant");
  const [steps, setSteps] = useState<intSteps>([]);
  const [busy, setBusy] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
    async function getProject() {
      const result = await getStepsByIdProject(idProject);
      setBusy(false);
      setSteps(result);
    }

    getProject();
  }, [idProject, reload]);

  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les jalons</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
          {isOwner && (
            <div>
              <ProjectCreateStep setReload={setReload} />
            </div>
          )}
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
        <div className="b2-body flex flex-wrap gap-10 mt-10">
          {steps.map((step: intStep) => (
            <StepCard key={step.id} step={step} idProject={idProject} />
          ))}
        </div>
      )}
    </section>
  );
}
