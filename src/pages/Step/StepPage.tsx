import { useEffect, useState } from "react";
import StepTasks from "../../components/Project/Step/StepTasks";
import { intComments, intStep} from "../../services/interfaces/intProject";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  isOwner: boolean
}

export default function StepPage({isOwner}:Props) {

  const {idStep} = useParams();
  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    startDate:"",
    budget: 0,
    id:0
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/project-steps/" + idStep)
      .then(({ data }) => setStep(data.data))
      .catch((error) => setError(error));
  }, []);


  //temp
  const [comments, setComment] = useState<intComments>([
    { content: "contenu du commentaire 1", author: "Bob" },
    { content: "contenu du commentaire 2", author: "Jean" },
    { content: "contenu du commentaire 3", author: "Michel" },
  ]);

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepHeader isOwner={isOwner} step={step}/>
      <StepTasks isOwner={isOwner} step={step}/>
      <EspaceComment comments={comments} setComment={setComment} />
    </main>
  );
}
