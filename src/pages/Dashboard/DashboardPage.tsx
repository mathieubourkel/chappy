import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { Spinner } from "@material-tailwind/react";
import {
  getProjectsFromOwner, getProjectsFromUsers,
} from "../../services/api/projects";
import { intProject, intProjects } from "../../services/interfaces/intProject";

export default function DashboardPage() {
  const [collabs, setCollab] = useState<intProjects>([]);
  const [projects, setProject] = useState<intProjects>([]);
  const [error, setError] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false)
  const nbProj = collabs.length + projects.length;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const tmpProjects = await getProjectsFromOwner()
        const tmpCollabs = await getProjectsFromUsers()
        tmpCollabs.data.map((collab:intProject) => {
          collab.steps.reverse()
        })
        tmpProjects.data.map((project:intProject) => {
          project.steps.reverse()
        })
        setCollab(tmpCollabs.data.reverse());
        setProject(tmpProjects.data.reverse());
      } catch (error) {
        setError(true)
      } finally {
        setBusy(false);
      }
    };

    fetchProjects();
  }, [reload]);

  if (error) return (<div>Error Fetching Data..</div>)
  
  return (
    <main className="sm:mx-20 mx-5">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
          <DashboardHeader nbProj={nbProj}/>
          <DashboardProjects projects={projects} />
          <DashboardCollab collabs={collabs} setReload={setReload} />
        </>
      )}
    </main>
  );
}
