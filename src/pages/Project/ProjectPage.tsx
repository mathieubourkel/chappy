import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";
import {getProjectById} from "../../services/api/projects";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";
import { Status } from "../../services/enums/status.enum";
import NotFoundPage from "../../services/utils/NotFoundPage";
import {
  RefCommentEnum
} from '../../services/enums/comment.ref.enum.ts';
import { intProject } from "../../services/interfaces/intProject.tsx";
import { formatDate } from "../../services/utils/FormatDate.tsx";

export default function ProjectPage() {
  const { idProject } = useParams();
  const idUser:string = localStorage.getItem("id") || "";
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false)
  const [project, setProject] = useState<intProject>({
    _id: undefined,
    name: "",
    description: "",
    status: Status[0].value,
    owner: {id: 0},
    budget: 0,
    estimEndDate: formatDate(new Date()),
    code:"",
    steps: [],
    companies: []
  });
 
  useEffect(() => {
    const getProject = async () => {
      try {
      const result = await getProjectById(idProject ||"");
      setProject(result);
      result.owner.toString() === idUser && setIsOwner(true); 
      } catch (_error) {
        setError(true)
      } finally {
        setBusy(false)
      }   
    }
    getProject();
  }, [idProject, idUser, reload]);

  if (error) return (<NotFoundPage />)
  return (
    <main className="project-page sm:mx-20 mx-5 mt-10">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
          <ProjectHeader isOwner={isOwner} project={project} idProject={idProject ||''} />
          <ProjectDesc
            project={project}
            setProject={setProject}
            isOwner={isOwner}
          />
          <ProjectSteps
            project={project}
            idProject={idProject ||''}
            isOwner={isOwner}
            setReload={setReload}
          />
          <EspaceComment table={RefCommentEnum.projet} idParent={idProject ||""} />
        </>
      )}
    </main>
  );
}
