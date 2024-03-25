import DashboardCollab from "../../components/Dashboard/DashboardCollab";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardProjects from "../../components/Dashboard/DashboardProjects";
import { intProject, intProjects } from "../../services/interfaces/intProject";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { useFetch } from "../../hooks/useFetch";
import { DataStatusEnum } from "../../services/enums/data.status.enum";
import { useState } from "react";

export default function DashboardPage() {

  const {data :dataP, updateData: updateDataP, status: statusP, handleErrorAndLoading:handleErrorAndLoadingP} = useFetch(`${ApiPathEnum.MY_PROJECTS}`)
  const {data :dataC, updateData: updateDataC, status: statusC, handleErrorAndLoading:handleErrorAndLoadingC} = useFetch(`${ApiPathEnum.MY_COLLABS}`)
  const [nbProj, setNbProj] = useState<number>(0)
 
  const reformat = (projects:intProjects, setProjects:(projects:intProjects) => void) => {
    projects.map((project:intProject) => {
      project.steps.reverse()
    })
    projects.reverse()
    setNbProj(nbProj + projects.length)
    setProjects(projects)
  }

  if (statusP === DataStatusEnum.FIRST_FETCH) reformat(dataP, updateDataP)
  if (statusC === DataStatusEnum.FIRST_FETCH) reformat(dataC, updateDataC)

  return (
    <main className="md:mx-20 mx-5">
      <DashboardHeader nbProj={nbProj}/>
      <section className="md:mt-5 mt-10 mb-28">
        <h2>Mes projets</h2>
        {handleErrorAndLoadingP()}
        {statusP === DataStatusEnum.MODIFIED && <DashboardProjects projects={dataP}/>}
      </section>
      <section className="my-10 mb-28">
        <h2>Mes collaborations</h2>
        {handleErrorAndLoadingC()}
        {statusC === DataStatusEnum.MODIFIED && <DashboardCollab collabs={dataC} />}
      </section>
    </main>
  );
}
