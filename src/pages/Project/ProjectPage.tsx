import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";
import {RefCommentEnum} from '../../services/enums/comment.ref.enum.ts';
import { DataStatusEnum } from "../../services/enums/data.status.enum.ts";
import { ApiPathEnum } from "../../services/enums/api.path.enum.ts";

export default function ProjectPage() {
  const { idProject } = useParams();
  const idUser:string = localStorage.getItem("id") || "";
 
  const {data, updateData, status, handleErrorAndLoading} = useFetch(`${ApiPathEnum.PROJECT}/${idProject}`)

  if (status === DataStatusEnum.FIRST_FETCH){
    data.owner.id.toString() === idUser && (data.isOwner = true)
    data.steps.reverse()
  }

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className="project-page md:mx-20 mx-5 mt-10">
      
      <ProjectHeader isOwner={data.isOwner} project={data} />
      <ProjectDesc
        setProject={updateData}
        project={data}
        isOwner={data.isOwner}
      />
      <ProjectSteps
        project={data}
        isOwner={data.isOwner}
        setProject={updateData}
      />
      <EspaceComment table={RefCommentEnum.projet} idParent={idProject ||""} />
    </main>}
    </>
  )
}
