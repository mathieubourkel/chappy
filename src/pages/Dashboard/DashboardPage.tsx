import { useEffect, useState } from "react";
import DashboardCollab from "../../components/Project/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Project/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Project/Dashboard/DashboardProjects";
import { Spinner } from "@material-tailwind/react";
import {
  getProjectsFromOwner, getProjectsFromUsers,
} from "../../services/api/projects";
import { intProject, intProjects } from "../../services/interfaces/intProject";
import ErrorFetchingData from "../../services/utils/ErrorFetchingData";

export default function DashboardPage() {
  const [collabs, setCollab] = useState<intProjects>([]);
  const [projects, setProject] = useState<intProjects>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorCollabs, setErrorCollabs]= useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(true);
  const [busyCollabs, setBusyCollabs] = useState<boolean>(true);
  
  const [reload, setReload] = useState<boolean>(false)
  const nbProj = collabs.length + projects.length;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const tmpProjects = await getProjectsFromOwner()
        tmpProjects.data.map((project:intProject) => {
          project.steps.reverse()
        })
        setProject(tmpProjects.data.reverse());
      } catch (_error) {
        setError(true)
      } finally {
        setBusy(false);
      }
    };
    const fetchCollabs = async () => {
      try {
        const tmpCollabs = await getProjectsFromUsers()
        tmpCollabs.data.map((collab:intProject) => {
          collab.steps.reverse()
        })
        setCollab(tmpCollabs.data.reverse());
      } catch (_error) {
        setErrorCollabs(true)
      } finally {
        setBusyCollabs(false);
      }
    }
    fetchProjects();
    fetchCollabs();
  }, [reload]);

  
  
  return (
    <main className="md:mx-20 mx-5">

          <DashboardHeader nbProj={nbProj}/>
          {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : ( <section className="md:mt-5 mt-10 mb-28">
        <h2>Mes projets</h2>
          {!error ? <DashboardProjects projects={projects} />
          : <ErrorFetchingData name={"projects"}/>}
          </section>
          )}

{busyCollabs ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <section className="my-10 mb-28">
          <h2>Mes collaborations</h2>
          {!errorCollabs ? <DashboardCollab collabs={collabs} setReload={setReload}/>
          : <ErrorFetchingData name="collabs"/>}
          </section>
      )}

    </main>
  );
}
