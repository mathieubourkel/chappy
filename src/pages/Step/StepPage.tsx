import { useState } from "react"
import StepTasks from "../../components/Project/Step/StepTasks"
import { intComments, intStep, intTasks, intUsers } from "../../services/interfaces/intProject"
import EspaceComment from "../../components/Project/Comments/EspaceComment"
import StepHeader from "../../components/Project/Step/StepHeader"

export default function StepPage() {

  const [step, setStep] = useState<intStep>({
    name: "Jalon1", description: "Description du jalion lorel rkgjd", budget: 500, startDate:"04.23.34"
  })

  const [tasks, setTask] = useState<intTasks>([
{name: "Nomtache1", description: "desription tache1", status: "En cours", 
startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite"},
{name: "Nomtache2", description: "desription tache2", status: "Terminée", 
startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite"},
{name: "Nomtache3", description: "desription tache3", status: "En attente", 
startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite"},
{name: "Nomtache4", description: "desription tache4", status: "En cours", 
startDate:"10-12-23", endDate:"12-12-23", categorie: "Electricite"}
  ])
  const [comments, setComment] = useState<intComments>([
    {content: "contenu du commentaire 1", author: "Bob"},
    {content: "contenu du commentaire 2", author: "Jean"},
    {content: "contenu du commentaire 3", author: "Michel"},

  ])
  const [users, setUser] = useState<intUsers>(["Pierre", "Paul", "Jack"]);
  const isOwner = true;

  const [status, setStatus] = useState<Array<string>>(["En cours", "En attente", "Terminée"]);
  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepHeader step={step} setStep={setStep} isOwner={isOwner}/>
      <StepTasks tasks={tasks} setTask={setTask} isOwner={isOwner} users={users} setUser={setUser} status={status} setStatus={setStatus}/>
      <EspaceComment comments={comments} setComment={setComment}  />
    </main>
  )
}

