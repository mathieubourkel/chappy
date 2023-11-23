import {  useState } from "react";
import Comments from "../../components/Project/Comments";
import Resume from "../../components/Project/Resume";
import Steps from "../../components/Project/Steps";
import { intComments, intProject, intSteps } from "../../services/interfaces/intProject";
import "../../css/Project.css";

export default function ProjectPage() {

  const [project, setProject] = useState<intProject>({
    name: "Nom du projet", description: "Description du projet la j,ffdkfdksdnfjnsdjnf ndf ndsf sdnfjfn sjfsf s,f f sd fsdnf bfsd, ds,n fbdsnsbd", budget: 500, status: "En cours", owner: "Mathieu", id: 0
  })

  const [steps, setStep] = useState<intSteps>([
    {name: "Nom step1", description: "description step1", budget: 300, startDate: "new Date()"},
    {name: "Nom step2", description: "description step2", budget: 200, startDate: "new Date()"},
    {name: "Nom step3", description: "description step3", budget: 100, startDate: "new Date()"},
    {name: "Nom step4", description: "description step4", budget: 400, startDate: "new Date()"}
  ])

  const [comments, setComment] = useState<intComments>([
    {content: "contenu du commentaire 1", author: "Bob"},
    {content: "contenu du commentaire 2", author: "Jean"},
    {content: "contenu du commentaire 3", author: "Michel"},

  ])

  return (
    <main className="project-page sm:mx-20 mx-5">
      <Resume project={project} setProject={setProject} />
      <Steps steps={steps} setStep={setStep}/>
      <Comments comments={comments} setComment={setComment} />
    </main>
  )
}

