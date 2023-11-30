import { useEffect, useState } from "react";
import StepTasks from "../../components/Project/Step/StepTasks";
import { intComments, intStep } from "../../services/interfaces/intProject";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import { useParams } from "react-router-dom";
import { getStepById } from "../../services/api/projects";

type Props = {
  isOwner: boolean;
};

export default function StepPage({ isOwner }: Props) {
  console.log("StepPage");
  const { idStep } = useParams();
  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    estimEndDate: new Date(),
    budget: 0,
    id: 0,
  });

  useEffect(() => {
    async function getStep() {
      const result = await getStepById(idStep);
      setStep(result);
    }
    getStep();
  }, [idStep]);

  //temp
  const [comments, setComment] = useState<intComments>([
    { content: "contenu du commentaire 1", author: "Bob" },
    { content: "contenu du commentaire 2", author: "Jean" },
    { content: "contenu du commentaire 3", author: "Michel" },
  ]);

  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepHeader isOwner={isOwner} step={step} setStep={setStep} />
      <StepTasks isOwner={isOwner} />
      <EspaceComment comments={comments} setComment={setComment} />
    </main>
  );
}
