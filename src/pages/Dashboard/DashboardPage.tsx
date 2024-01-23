import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjectsDash } from "../../services/interfaces/intProject";
import { Spinner } from "@material-tailwind/react";
import {
  getProjectsFromOwner,
  getProjectsFromUsers,
} from "../../services/api/projects";

export default function DashboardPage() {
  const [collabs, setCollab] = useState<intProjectsDash>([]);
  const [projects, setProject] = useState<intProjectsDash>([]);
  const [busy, setBusy] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false)
  const nbProj = collabs.length + projects.length;
  const idUser = localStorage.getItem("id");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const tmpProjects = await getProjectsFromOwner(idUser)
        const tmpCollabs = await getProjectsFromUsers(idUser)
        setCollab(tmpCollabs);
        setProject(tmpProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setBusy(false);
      }
    };

    fetchProjects();
  }, [idUser, reload]);
  
  return (
    <main className="sm:mx-20 mx-5">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
          <DashboardHeader nbProj={nbProj} setReload={setReload}/>
          <DashboardProjects projects={projects} />
          <DashboardCollab collabs={collabs} setReload={setReload} />
        </>
      )}
    </main>
  );
}
