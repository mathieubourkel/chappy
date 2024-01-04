import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { intProject } from "../../services/interfaces/intProject";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";
import {getProjectById} from "../../services/api/projects";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";

export default function ProjectPage() {
  console.log("ProjectPage");
  const { idProject } = useParams();
  const idUser = localStorage.getItem("id");
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [project, setProject] = useState<intProject>({
    name: "",
    description: "aa",
    status: 0,
    owner: { id: null },
    budget: 0,
    id: 0,
    project_steps: [],
    estimEndDate: new Date(),
    code:''
  });

  useEffect(() => {
    async function getProject() {
      const result = await getProjectById(idProject);
      setBusy(false);
      setProject(result);
      result.owner.id.toString() === idUser && setIsOwner(true);
    }

    getProject();
  }, [idProject, idUser]);

  return (
    <main className="project-page sm:mx-20 mx-5 mt-10">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
          <ProjectHeader isOwner={isOwner} project={project} idProject={idProject} />
          <ProjectDesc
            project={project}
            setProject={setProject}
            isOwner={isOwner}
          />
          <ProjectSteps
            idProject={idProject}
            isOwner={isOwner}
          />
          <EspaceComment table="project" idParent={idProject} />
        </>
      )}
    </main>
  );
}
