import {  useState } from "react";
import { intComments, intProject, intSteps } from "../../services/interfaces/intProject";
import "../../css/Project.css";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";

type Props = {
  project: intProject,
  setProject: (project:intProject) => void;
  isOwner: boolean
}

export default function ProjectPage({project, setProject, isOwner}:Props) {

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
      <ProjectHeader project={project}/>
      <ProjectDesc project={project} setProject={setProject} isOwner={isOwner}/>
      <ProjectSteps steps={steps} setStep={setStep} isOwner={isOwner} />
      <EspaceComment comments={comments} setComment={setComment} />
    </main>
  )
}

