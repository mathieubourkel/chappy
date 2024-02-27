import StepCard from "../Step/StepCard";
import {faBan,faCircleExclamation,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useState } from "react";
import CreateButton from "../elements/Buttons/CreateButton";
import OpenButton from "../elements/Buttons/OpenButton";
import { Link } from "react-router-dom";
import { Alert, Typography } from "@material-tailwind/react";
import {intProject,intProjects,} from "../../../services/interfaces/intProject";
import { intStep } from "../../../services/interfaces/intStep";
import { useFilterDisplay } from "../../../hooks/useFilterDisplay";

export default function DashboardProjects({ projects }:{projects:intProjects}) {

  const [selected, setSelected] = useState<intProject>(projects[0]);
  const {filteredData, renderNextButton, renderBeforeButton } = useFilterDisplay(5, projects)
  const {filteredData: filteredDataS, renderNextButton: renderNextButtonS, renderBeforeButton: renderBeforeButtonS, reloadFilteredData } = useFilterDisplay(5, selected.steps)
  
  const handleClick = (project: intProject) => {
    setSelected(project);
    reloadFilteredData(project.steps);
  };

  return (
    <>
      {projects.length > 0 ? (
        <article className='mt-5'>
          <div className="m-3 lg:flex lg:justify-between">
            <nav className="2xl:pl-20 flex justify-between lg:w-[70vw] gap-5">
              <div className="w-[5vw]">
                {renderBeforeButton()}
              </div>
              <div className="flex justify-center w-full ml-5 sm:ml-0 w-[80vw] lg:max-w-[50vw]">
                {filteredData.map((project: intProject) => (
                  <button
                    key={project._id}
                    onClick={() => handleClick(project)}
                    className={
                      "text-brick-300 w-[13vw] line-clamp-1 rounded-none border-0 border-b-2 border-b-brick-200 " +
                      (project._id === selected._id &&
                        "border-b-brick-300 font-extrabold")
                    }
                  >
                    <p className="truncate">{project.name}</p>
                  </button>
                ))}
              </div>
              <div className="w-[5vw]">
              {renderNextButton()}
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
              {renderBeforeButtonS()}
            </div>
            <div className="flex flex-wrap w-[80vw] gap-5 justify-center">
              {filteredDataS.map((step: intStep) => (
                <StepCard step={step} key={step._id} idProject={selected._id} />
              ))}
            </div>
            <div className="flex w-[5vw] items-center">
            {renderNextButtonS()}
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
      </>
  );
}
