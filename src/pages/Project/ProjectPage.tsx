import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import ProjectHeader from "../../components/Project/ProjectHeader";
import ProjectSteps from "../../components/Project/ProjectSteps";
import {RefCommentEnum} from '../../services/enums/comment.ref.enum.ts';
import { DataStatusEnum } from "../../services/enums/data.status.enum.ts";
import { ApiPathEnum } from "../../services/enums/api.path.enum.ts";
import ProjectDesc from "../../components/Project/ProjetDesc.tsx";
import EspaceComment from "../../components/Comments/EspaceComment.tsx";

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
