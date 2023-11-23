import { useState } from "react"
import Comments from "../../components/Project/Step/StepComments"
import StepResume from "../../components/Project/Step/StepResume"
import StepTasks from "../../components/Project/Step/StepTasks"
import { intStep, intTasks } from "../../services/interfaces/intProject"

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

  return (
    <main className="project-page sm:mx-20 mx-5">
      <StepResume step={step} setStep={setStep}/>
      <StepTasks tasks={tasks} setTask={setTask}/>
      <Comments />
    </main>
  )
}

