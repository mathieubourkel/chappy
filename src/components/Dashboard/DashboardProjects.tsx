import StepCard from "../Step/CardStep";
import {faBan,faCircleExclamation,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Typography } from "@material-tailwind/react";
import {intProject,intProjects,} from "../../services/interfaces/intProject";
import { intStep } from "../../services/interfaces/intStep";
import { useFilterDisplay } from "../../hooks/useFilterDisplay";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import ModalCreateStep from "../Project/ModalCreateStep";

export default function DashboardProjects({ projects }:{projects:intProjects}) {

  const [selected, setSelected] = useState<intProject>(projects[0] || {steps:[{id:0}]});
  const {filteredData, renderNextButton, renderBeforeButton } = useFilterDisplay(5, projects)
  const {filteredData: filteredDataS, renderNextButton: renderNextButtonS, renderBeforeButton: renderBeforeButtonS, reloadFilteredData } = useFilterDisplay(5, selected.steps)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleClick = (project: intProject) => {
    setSelected(project);
    reloadFilteredData(project.steps);
  };

  return (
    <article>
      {projects.length > 0 ? (
        <div className='mt-5'>
          <ModalCreateStep setProject={setSelected} project={selected} reloadFilteredData={reloadFilteredData} open={open} handleOpen={handleOpen}/>
          <div className="m-3 lg:flex mt-5">
            <nav className="2xl:pl-20 flex justify-between lg:w-[70vw] gap-5">
              <div className="w-[5vw]">
                {renderBeforeButton()}
              </div>
              <div className="flex justify-center ml-5 sm:ml-0 lg:max-w-[60vw]">
                {filteredData.map((project: intProject) => (
                  <button
                    key={project._id}
                    onClick={() => handleClick(project)}
                    className={
                      "text-brick-300 w-[10vw] line-clamp-1 rounded-none border-0 border-b-2 border-b-brick-200 " +
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

            <div className="flex justify-center 2xl:justify-end gap-5 mt-10 lg:mt-0 2xl:w-[40vw]">
              <Link to={"/project/" + selected._id}>
                <MagicButton type={ButtonTypeEnum.OPEN} value="Ouvrir le projet" wrap='2xl'/>
              </Link>
              <Link to="/create-project">
              <MagicButton type={ButtonTypeEnum.CREATE} value="Nouveau projet" wrap='2xl'/>
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
                  onClick={handleOpen}
                  className={
                    "inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer ml-1"
                  }
                >
                    créer votre premier jalon.
                </Typography>
              </Alert>
              </div>
            )}
        </div>
      ) : (
        <div>
          <nav className="flex justify-end">
            <Link to="/create-project">
              <MagicButton type={ButtonTypeEnum.CREATE} value='Nouveau projet'/>
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
        </div>
      )}
      </article>
  );
}
