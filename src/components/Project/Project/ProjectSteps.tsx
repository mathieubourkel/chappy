import {
  Alert,
  IconButton,
  Spinner,
  Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
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
    <section className="mb-20">
      <article className="flex justify-between">
          <h2>Les jalons</h2>
        <nav className="flex gap-5 items-center">
          {isOwner && (
            <div>
              <ProjectCreateStep setReload={setReload} />
            </div>
          )}
          <div>
            <IconButton size={"sm"}>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </nav>
      </article>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {steps.map((step: intStep) => (
            <StepCard key={step.id} step={step} idProject={idProject} />
          ))}
        </div>
      )}

      {steps.length == 0 && <Alert
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
