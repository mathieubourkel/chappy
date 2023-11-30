import { useEffect, useState } from "react";
import { intComments, intProject } from "../../services/interfaces/intProject";
import "../../css/Project.css";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/api/projects";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";

type Props = {
  isOwner: boolean;
};

export default function ProjectPage({ isOwner }: Props) {
  console.log('ProjectPage')
  const { idProject } = useParams();
  const [comments, setComment] = useState<intComments>([
    { content: "contenu du commentaire 1", author: "Bob" },
    { content: "contenu du commentaire 2", author: "Jean" },
    { content: "contenu du commentaire 3", author: "Michel" },
  ]);

  const [project, setProject] = useState<intProject>({
    name: "",
    description: "",
    status: 0,
    owner: "",
    budget: 0,
    id:0,
    project_steps: [],
    estimEndDate: new Date()
  });

  useEffect(() => {
      async function getProject(){
        const result = await getProjectById(idProject)
        setProject(result)
      }

      getProject();
  }, [idProject]);

  function handleDelete(): void {
    throw new Error("Function not implemented.");
  }
 
  return (
    <main className="project-page sm:mx-20 mx-5">
      <ProjectHeader project={project} idProject={idProject}/>
      <ProjectDesc
        project={project}
        setProject={setProject}
        isOwner={isOwner}
      />
      <ProjectSteps project={project} isOwner={isOwner} setProject={setProject} />
      <EspaceComment comments={comments} setComment={setComment} />
      <div className="flex justify-end mb-10">
        <Button onClick={() => handleDelete()}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
          <a className="ml-5">Supprimer le projet</a>
        </Button>
      </div>
    </main>
  );
}
