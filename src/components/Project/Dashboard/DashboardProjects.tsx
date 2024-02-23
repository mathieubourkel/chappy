
import StepCard from "../Cards/StepCard";
import {
  faBan, faChevronLeft, faChevronRight, faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CreateButton from "../elements/Buttons/CreateButton";
import OpenButton from "../elements/Buttons/OpenButton";
import {Link} from "react-router-dom";
import {
  Alert, IconButton, Typography
} from "@material-tailwind/react";
import { intProject, intProjects } from "../../../services/interfaces/intProject";
import { intStep } from "../../../services/interfaces/intStep";

type Props = {
  projects: intProjects;
};

export default function DashboardProjects({ projects }: Props) {
  const [selected, setSelected] = useState(projects[0]);
  const handleClick = (project:intProject) => {
    setSelected(project);
  }
  const [projectsDisplay, setProjectsDisplay] = useState(projects.slice(0,5))
  const [current, setCurrent] = useState(0)
  const nextOrBefore = (next: boolean) => {
    if (next) {
      setCurrent(Math.min(current +5, projects.length))
      setProjectsDisplay(projects.slice(current, Math.min(current +5, projects.length)))
    } else {
      setCurrent(Math.max(0, current -5))
      setProjectsDisplay(projects.slice(Math.max(0, current -5), current))
    }
  }
  
  return (
    <section className="md:mt-5 mt-10 mb-28">
        <h2>Mes projets</h2>

      {projects.length > 0 ? (
        <article>
          <nav className="md:flex md:mb-3">
          
            <div className="ml-20 mb-3 md:flex justify-center basis-3/4 ">
            {current > 0 && <IconButton className='bg-brick-300 mx-10' onClick={() => nextOrBefore(false)}><FontAwesomeIcon icon={faChevronLeft} /></IconButton>}
              {projectsDisplay.map((project: intProject) => (
                <button
                  key={project._id}
                  onClick={() => handleClick(project)}
                  className={
                    "text-brick-300 px-10 rounded-none border-0 border-b-2 border-b-brick-200 " +
                    (project._id === selected._id && "border-b-brick-300 font-extrabold")}
                    >
                  {project.name}
                </button>
              ))}
              {current != projects.length && <IconButton className='bg-brick-300 mx-10' onClick={() => nextOrBefore(true)}><FontAwesomeIcon icon={faChevronRight} /></IconButton>}
            </div>
            
            <div className="flex md:justify-end justify-center basis-1/4 gap-5">
              <Link to={"/project/" + selected._id}>
                <OpenButton value="Ouvrir le projet" />
              </Link>
              <Link to="/create-project">
                <CreateButton value="Nouveau projet" />
              </Link>
            </div>
          </nav>
          <div className="flex flex-wrap gap-5 justify-center">
            {selected.steps.map((step: intStep) => (
              <StepCard
                step={step}
                key={step._id}
                idProject={selected._id}
              />
            ))}
            {selected.steps.length == 0 &&
                <Alert
                icon={<FontAwesomeIcon icon={faCircleExclamation} className={"text-brick-400 text-xl"}/>}
                className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
            >
              Vous n'avez aucun jalon,

                  <Typography
                    variant="paragraph"
                    className={"inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer ml-1"}
                >
                  <Link to={"/project/" + selected._id}>
                     créer votre premier jalon.
                  </Link>
                </Typography>
            </Alert> }
          </div>

        </article>
      ) : (
        <article>
          <nav className="flex justify-end">
            <Link to="/create-project">
              <CreateButton value="Nouveau projet" />
            </Link>
          </nav>
          <Alert
              icon={<FontAwesomeIcon icon={faBan} className={"text-marine-300 text-xl"}/>}
              className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
          >
            Aucun projet en cours.
          </Alert>
        </article>
      )}


    </section>
  );
}