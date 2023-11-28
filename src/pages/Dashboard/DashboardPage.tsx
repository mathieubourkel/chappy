import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjects, intSteps, intUser } from "../../services/interfaces/intProject";

export default function DashboardPage() {

  const user:intUser = {name: "Paul", company: "Compagnie créole"}

  const steps:intSteps = [
    {name: "Nom step1", description: "description step1", budget: 300, startDate: "new Date()"},
    {name: "Nom step2", description: "description step2", budget: 200, startDate: "new Date()"},
    {name: "Nom step3", description: "description step3", budget: 100, startDate: "new Date()"},
    {name: "Nom step4", description: "description step4", budget: 400, startDate: "new Date()"}
  ]

  const projects:intProjects = [
    {name: "Projet1", description: "Description du projet la j,ffdkfdksdnfjnsdjnf ndf ndsf sdnfjfn sjfsf s,f f sd fsdnf bfsd, ds,n fbdsnsbd", budget: 500, status: "En cours", owner: "Mathieu"},
    {name: "Projet2", description: "Description du projet la j,ffdkfdksdnfjnsdjnf ndf ndsf sdnfjfn sjfsf s,f f sd fsdnf bfsd, ds,n fbdsnsbd", budget: 600, status: "En cours", owner: "Bob"},
    {name: "Projet3", description: "Description du projet la j,ffdkfdksdnfjnsdjnf ndf ndsf sdnfjfn sjfsf s,f f sd fsdnf bfsd, ds,n fbdsnsbd", budget: 700, status: "terminé", owner: "Mathieu"},
  ]

  return (
    <main className="dashboard-page sm:mx-20 mx-5">
      <DashboardHeader user={user} projects={projects}/>
      <DashboardProjects projects={projects}  steps={steps}/>
      <DashboardCollab projects={projects} steps={steps}/>
    </main>
  );
}
