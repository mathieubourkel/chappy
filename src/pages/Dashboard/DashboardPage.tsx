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
  const [reload, setReload] = useState<boolean>(false)

  const nbProj = collabs.length + projects.length;

  const idUser = localStorage.getItem("id");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [tmpCollabs, tmpProjects] = await Promise.all([
          getProjectsFromUsers(idUser),
          getProjectsFromOwner(idUser),
        ]);
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
  console.log(collabs)
  console.log(projects)
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
