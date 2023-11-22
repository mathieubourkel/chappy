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
    {name: "Nom step1", description: "description step1", id: 0, budget: 300, startTime: new Date(), endTime: new Date()},
    {name: "Nom step2", description: "description step2", id: 1, budget: 200, startTime: new Date(), endTime: new Date()},
    {name: "Nom step3", description: "description step3", id: 2, budget: 100, startTime: new Date(), endTime: new Date()},
    {name: "Nom step4", description: "description step4", id: 3, budget: 400, startTime: new Date(), endTime: new Date()}
  ])

  const [comments, setComment] = useState<intComments>([
    {name: "nom com1", content: "contenu du commentaire 1", id: 0, author: "Bob"},
    {name: "nom com2", content: "contenu du commentaire 2", id: 1, author: "Jean"},
    {name: "nom com3", content: "contenu du commentaire 3", id: 2, author: "Michel"},

  ])

  return (
    <main className="project-page mr-20 ml-20">
      <Resume project={project} setProject={setProject}/>
      <Steps steps={steps}/>
      <Comments comments={comments}/>
    </main>
  )
}

