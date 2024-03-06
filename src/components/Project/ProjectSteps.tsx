import {Alert,Typography} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import { intProject } from "../../services/interfaces/intProject";
import { intStep } from "../../services/interfaces/intStep";
import { useFilterDisplay } from "../../hooks/useFilterDisplay";
import ModalCreateStep from "./ModalCreateStep";
import CardStep from "../Step/CardStep";
import MagicIconButton from "../elements/Buttons/MagicIconButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import { useState } from "react";

type Props = {
  isOwner:boolean
  project: intProject
  setProject: (project:intProject) => void;
};

export default function ProjectSteps({ isOwner, project, setProject}: Props) {

  const {filteredData, renderNextButton, renderBeforeButton, reloadFilteredData} = useFilterDisplay(5, project.steps)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <section className="mb-20">
      <article className="flex justify-between">
          <h2>Les jalons</h2>
        <nav className="flex gap-5 items-center">
          {isOwner && (
            <div>
              <MagicButton type={ButtonTypeEnum.CREATE} handleClick={handleOpen} wrap="lg"/>
              <ModalCreateStep setProject={setProject} project={project} reloadFilteredData={reloadFilteredData} open={open} handleOpen={handleOpen}/>
            </div>
          )}
          <div>
            <MagicIconButton type={ButtonTypeEnum.FILTER}/>
          </div>
        </nav>
      </article>

      <div className="flex gap-5 lg:mt-10">
      <div className="flex w-[5vw] items-center">
            {renderBeforeButton()}
            </div>
            <div className="flex flex-wrap w-[80vw] gap-5 justify-center">
          {filteredData.map((step: intStep) => (
            <CardStep key={step._id} step={step} idProject={project._id} />
          ))}
          </div>
          <div className="flex w-[5vw] items-center">
              {renderNextButton()}
              </div>
        </div>
      {project.steps.length == 0 && <Alert
          icon={<FontAwesomeIcon icon={faCircleExclamation} className={"text-brick-400 text-xl"}/>}
          className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5">
        Vous n'avez aucun jalon,
        <Typography variant="paragraph"
         onClick={handleOpen}
         className={"inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer ml-1"}>
            créer votre premier jalon.
        </Typography>
      </Alert>}
    </section>
  );
}
