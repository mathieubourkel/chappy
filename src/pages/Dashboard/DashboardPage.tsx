import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { intProjects } from "../../services/interfaces/intProject";
import { Spinner } from "@material-tailwind/react";
import {
  getProjectsFromOwner,
  getProjectsFromUsers,
} from "../../services/api/projects";

export default function DashboardPage() {
  console.log("DashBoardPageComposant");
  const [collabs, setCollab] = useState<intProjects>([]);
  const [projects, setProject] = useState<intProjects>([]);
  const [busy, setBusy] = useState<boolean>(true);
  const nbProj = collabs.length + projects.length;

  const idUser = localStorage.getItem("id");

  useEffect(() => {
    const getProjects = async () => {
      const projectss = await getProjectsFromOwner(idUser);
      const collabss = await getProjectsFromUsers(idUser);
      setBusy(false);
      setCollab(collabss);
      setProject(projectss);
    };

    getProjects();
  }, [idUser]);

  return (
    <main className="dashboard-page sm:mx-20 mx-5">
      {busy ? (
        <div className='flex justify-center mt-20'>
        <Spinner className="h-16 w-16 text-gray-900/50"/>
        </div>
      ) : (
        <>
          <DashboardHeader nbProj={nbProj} />
          <DashboardProjects projects={projects} />
          <DashboardCollab collabs={collabs} />
        </>
      )}
    </main>
  );
}
