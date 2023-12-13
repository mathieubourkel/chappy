import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import { useParams } from "react-router-dom";

export default function StepPage() {
  console.log("StepPage");
  const { idStep } = useParams();

  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepHeader />
      <StepTasks />
      <EspaceComment table="project_step" idParent={idStep} />
    </main>
  );
}
