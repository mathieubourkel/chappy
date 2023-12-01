import { useEffect, useState } from "react";
import { intComments, intProject } from "../../services/interfaces/intProject";
import "../../css/Project.css";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import ProjectDesc from "../../components/Project/Project/ProjectDesc";
import { useParams } from "react-router-dom";
import { deleteProjectFromBDD, getProjectById } from "../../services/api/projects";
import ProjectSteps from "../../components/Project/Project/ProjectSteps";
import DeleteProject from "../../components/Project/Modals/DeleteProject";

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
    app_user: {id:1},
    budget: 0,
    id:0,
    project_steps: [],
    estimEndDate: new Date()
  });
  const [reload, setReload] = useState(false)
const handleReload = () => setReload((bool) => !bool);
  useEffect(() => {
      async function getProject(){
        const result = await getProjectById(idProject)
        setProject(result)
      }

      getProject();
  }, [reload]);

  function handleDelete(){
    deleteProjectFromBDD(idProject)
  }
 
  return (
    <main className="project-page sm:mx-20 mx-5 mt-20">
      <ProjectHeader project={project} idProject={idProject}/>
      <ProjectDesc
        project={project}
        setProject={setProject}
        isOwner={isOwner}
      />
      <ProjectSteps handleReload={handleReload} project={project} isOwner={isOwner} setProject={setProject} />
      <EspaceComment comments={comments} setComment={setComment} />
      <div className="flex justify-end mb-10">
        <DeleteProject handleDelete={handleDelete} />
      </div>
    </main>
  );
}
