import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjects } from "../../services/interfaces/intProject";
import { getProjectsFromOwner, getProjectsFromUsers } from "../../services/api/projects";

export default function DashboardPage() {
  console.log("DashBoardPageComposant")
  const [collabs, setCollab] = useState<intProjects>([]);
  const [projects, setProject] = useState<intProjects>([]);
  const nbProj = collabs.length + projects.length

  const idUser = localStorage.getItem('id');

  useEffect(() => {

    async function getProjects() {
      const projectss = await getProjectsFromOwner(idUser);
      const collabss = await getProjectsFromUsers(idUser);
      setCollab(collabss)
      setProject(projectss)
    }

    getProjects();
    
  }, []);

  return (
    <main className="dashboard-page sm:mx-20 mx-5">
      <DashboardHeader nbProj={nbProj} />
      <DashboardProjects projects={projects} />
      <DashboardCollab collabs={collabs} />
    </main>
  );
}
