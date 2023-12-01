import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ProjectCreateStep from "../Modals/ProjectCreateStep";
import StepCard from "../Cards/StepCard";
import { intProject, intStep } from "../../../services/interfaces/intProject";


type Props = {
  isOwner: boolean
  project: intProject
  setProject: (project: intProject) => void;
  handleReload : () => void;
};

export default function ProjectSteps({handleReload, isOwner, project, setProject}: Props) {
  console.log('ProjectStepsComposant')
  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les jalons</h2>
        </div>
        <div className="b2-header-buttons flex gap-5 items-center">
          {isOwner && 
          <div>
            <ProjectCreateStep handleReload={handleReload} project={project} setProject={setProject} />
          </div> }
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="b2-body flex flex-wrap gap-10 mt-10">
        {project.project_steps.map((step: intStep, index: number) => (
          <StepCard key={index} step={step} idProject={project.id} />
        ))}
      </div>
    </section>
  );
}
