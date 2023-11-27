import { useState } from "react";
import StepTasks from "../../components/Project/Step/StepTasks";
import { intComments} from "../../services/interfaces/intProject";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";

type Props = {
  isOwner: boolean
}

export default function StepPage({isOwner}:Props) {

  //temp
  const [comments, setComment] = useState<intComments>([
    { content: "contenu du commentaire 1", author: "Bob" },
    { content: "contenu du commentaire 2", author: "Jean" },
    { content: "contenu du commentaire 3", author: "Michel" },
  ]);

  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepHeader isOwner={isOwner} />
      <StepTasks isOwner={isOwner} />
      <EspaceComment comments={comments} setComment={setComment} />
    </main>
  );
}
