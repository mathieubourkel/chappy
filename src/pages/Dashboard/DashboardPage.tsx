import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjects, intUser } from "../../services/interfaces/intProject";
import { getProjectsFromOwner, getProjectsFromUsers } from "../../services/api/projects";

export default function DashboardPage() {

  const user: intUser = { name: "Paul", company: "Compagnie créole", email:"paulo@paulo.fr" };
  const [collabs, setCollab] = useState<intProjects>([]);
  const [projects, setProject] = useState<intProjects>([]);

  const nbProj = collabs.length + projects.length

  useEffect(() => {

    async function getProjects() {
      const projectss = await getProjectsFromOwner(1);
      const collabss = await getProjectsFromUsers(1);
      setCollab(collabss)
      setProject(projectss)
    }

    getProjects();
    
  }, []);

  return (
    <main className="dashboard-page sm:mx-20 mx-5">
      <DashboardHeader user={user} nbProj={nbProj} />
      <DashboardProjects projects={projects} />
      <DashboardCollab collabs={collabs} />
    </main>
  );
}
