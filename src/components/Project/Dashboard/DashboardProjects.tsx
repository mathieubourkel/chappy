import StepCard from "../Cards/StepCard";
import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CreateButton from "../elements/Buttons/CreateButton";
import OpenButton from "../elements/Buttons/OpenButton";
import { Link } from "react-router-dom";
import { Alert, IconButton, Typography } from "@material-tailwind/react";
import {
  intProject,
  intProjects,
} from "../../../services/interfaces/intProject";
import { intStep } from "../../../services/interfaces/intStep";

type Props = {
  projects: intProjects;
};

export default function DashboardProjects({ projects }: Props) {
  const [selected, setSelected] = useState(projects[0]);
  const handleClick = (project: intProject) => {
    setSelected(project);
    setStepsDisplay(project.steps.slice(0, 5));
  };

  const [projectsDisplay, setProjectsDisplay] = useState(projects.slice(0, 5));
  const [stepsDisplay, setStepsDisplay] = useState(selected.steps.slice(0, 5));
  const [current, setCurrent] = useState(5);
  const [currentSteps, setCurrentSteps] = useState(5);
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    if (firstTime) {
      setProjectsDisplay(projects.slice(0, 5));
      setCurrent(5);
    }
    setFirstTime(true);
  }, [projects, firstTime]);
  const nextOrBefore = (next: boolean) => {
    if (next) {
      setProjectsDisplay(
        projects.slice(current, Math.min(current + 5, projects.length))
      );
      setCurrent(current + 5);
    } else {
      setProjectsDisplay(
        projects.slice(Math.max(0, current - 10), current - 5)
      );
      setCurrent(current - 5);
    }
  };

  const nextOrBeforeSteps = (next: boolean) => {
    if (next) {
      setStepsDisplay(
        selected.steps.slice(
          currentSteps,
          Math.min(currentSteps + 5, selected.steps.length)
        )
      );
      setCurrentSteps(currentSteps + 5);
    } else {
      setStepsDisplay(
        selected.steps.slice(Math.max(0, currentSteps - 10), currentSteps - 5)
      );
      setCurrentSteps(currentSteps - 5);
    }
  };

  return (
    <section className="md:mt-5 mt-10 mb-28">
      <h2>Mes projets</h2>

      {projects.length > 0 ? (
        <article>
          <div className="mb-3 lg:flex lg:justify-between">
            <nav className="2xl:pl-20 flex w-[70vw] gap-5">
              <div className="w-[5vw] flex justify-end">
                {current - 5 != 0 && current != 0 && (
                  <IconButton
                    className="bg-transparent text-black"
                    onClick={() => nextOrBefore(false)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </IconButton>
                )}
              </div>
              <div className="flex justify-center w-full ml-5 sm:ml-0 max-w-[50vw]">
                {projectsDisplay.map((project: intProject) => (
                  <button
                    key={project._id}
                    onClick={() => handleClick(project)}
                    className={
                      "text-brick-300 w-[10vw] line-clamp-1 px-5 rounded-none border-0 border-b-2 border-b-brick-200 " +
                      (project._id === selected._id &&
                        "border-b-brick-300 font-extrabold")
                    }
                  >
                    <p className="w-[8vw] truncate">{project.name}</p>
                  </button>
                ))}
              </div>
              <div className="w-[5vw]">
                {current < projects.length &&
                  current + 5 != projects.length && (
                    <IconButton
                      className="bg-transparent text-black"
                      onClick={() => nextOrBefore(true)}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                  )}
              </div>
            </nav>

            <div className="flex justify-center gap-5 xl:justify-end mt-10 lg:mt-0 lg:w-[20vw]">
              <Link to={"/project/" + selected._id}>
                <OpenButton value="Ouvrir le projet" />
              </Link>
              <Link to="/create-project">
                <CreateButton value="Nouveau projet" />
              </Link>
            </div>
          </div>
          <div className="flex gap-5 lg:mt-10">
            <div className="flex w-[5vw] items-center">
              {currentSteps - 5 != 0 && currentSteps != 0 && (
                <IconButton
                  className="bg-transparent text-black"
                  onClick={() => nextOrBeforeSteps(false)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </IconButton>
              )}
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              {stepsDisplay.map((step: intStep) => (
                <StepCard step={step} key={step._id} idProject={selected._id} />
              ))}
            </div>
            <div className="flex w-[5vw] items-center">
              {currentSteps < selected.steps.length &&
                currentSteps + 5 != selected.steps.length && (
                  <IconButton
                    className="bg-transparent text-black"
                    onClick={() => nextOrBeforeSteps(true)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </IconButton>
                )}
            </div>
            
            
          </div>
          {selected.steps.length == 0 && (
              <div>
              <Alert
                icon={
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className={"text-brick-400 text-xl"}
                  />
                }
                className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
              >
                Vous n'avez aucun jalon,
                <Typography
                  variant="paragraph"
                  className={
                    "inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer ml-1"
                  }
                >
                  <Link to={"/project/" + selected._id}>
                    créer votre premier jalon.
                  </Link>
                </Typography>
              </Alert>
              </div>
            )}
        </article>
      ) : (
        <article>
          <nav className="flex justify-end">
            <Link to="/create-project">
              <CreateButton value="Nouveau projet" />
            </Link>
          </nav>
          <Alert
            icon={
              <FontAwesomeIcon
                icon={faBan}
                className={"text-marine-300 text-xl"}
              />
            }
            className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
          >
            Aucun projet en cours.
          </Alert>
        </article>
      )}
    </section>
  );
}
