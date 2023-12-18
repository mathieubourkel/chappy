import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { getStepById } from "../../services/api/steps";
import { getProjectById } from "../../services/api/projects";
import { intStep } from "../../services/interfaces/intProject";
import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";

export default function StepPage() {
  console.log("StepPage");
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const {idStep, idProject} = useParams();
  const idUser = localStorage.getItem("id");
  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    estimEndDate: new Date(),
    budget: 0,
    status:0,
    project: {id:idProject, name: ''},
    step_tasks: []
  });

  useEffect(() => {
    async function getInfoStep() {
      const tmpStep = await getStepById(idStep);
      const tmpProject = await getProjectById(idProject);
      setBusy(false);
      setStep(tmpStep);
      tmpProject.owner.id.toString() === idUser && setIsOwner(true);
    }
    getInfoStep();

  }, [idProject, idStep, idUser]);

  console.log(step)

  return (
    <main className="project-page sm:mx-20 mx-5">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
      <StepHeader step={step} isOwner={isOwner} setStep={setStep}/>
      <StepTasks step={step}/>
      <EspaceComment table="project_step" idParent={idStep} />
      </>)}
    </main>
  );
}
