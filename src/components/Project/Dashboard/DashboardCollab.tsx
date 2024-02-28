import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {Alert} from "@material-tailwind/react";
import DashboardCollabStepCard from "./DashboardCollabStepCard.tsx";
import {MenuCollab} from "../elements/Menu/MenuCollab.tsx";
import RejoinButton from "../elements/Buttons/OpenButton.tsx";
import RejoinModal from "../Modals/RejoinModal.tsx";
import { intProject, intProjects } from "../../../services/interfaces/intProject.tsx";
import { intStep } from "../../../services/interfaces/intStep.tsx";
import { useFilterDisplay } from "../../../hooks/useFilterDisplay.tsx";

export default function DashboardCollab({ collabs }: {collabs:intProjects}) {

  const [selected, setSelected] = useState<intProject>(collabs[0] || {steps:[{id:0}]});
  const {filteredData, renderNextButton, renderBeforeButton } = useFilterDisplay(5, collabs)

  const {filteredData: filteredDataS, renderNextButton: renderNextButtonS, renderBeforeButton: renderBeforeButtonS, reloadFilteredData } = useFilterDisplay(5, selected.steps)
  
  const handleClick = (collab:intProject) => {
    setSelected(collab);
    reloadFilteredData(collab.steps)
  }

  const [openD, setOpenD] = useState(false);
  const handleOpenD = () => setOpenD((bool) => !bool);

  return (
    <>
      {collabs.length > 0 ? (
        <article className='mt-5'>
          <div className="mb-3 lg:flex lg:justify-between">
          
          <nav className="2xl:pl-20 flex justify-between lg:w-[70vw] gap-5">
          <div className="w-[5vw]">
            {renderBeforeButton()}
            </div>
            <div className="flex justify-center w-full ml-5 w-[80vw] sm:ml-0 lg:max-w-[50vw]">
              {filteredData.map((collab: intProject) => (
                <button
                key={collab._id}
                onClick={() => handleClick(collab)}
                  className={
                    "w-[13vw] line-clamp-1 rounded-none border-0 border-b-2 border-b-marine-100 " +
                    (collab._id === selected._id && "border-b-marine-300 font-extrabold")
                  }
                >
                  <p className='truncate'>{collab.name}</p>
                </button>
              ))}
              </div>
              <div className="w-[5vw]">
              {renderNextButton()}
              </div>
            </nav>
            
            <div className="flex basis-1/4 my-5 lg:my-0 2xl:justify-end justify-center items-center gap-2">
              <MenuCollab handleOpenD={handleOpenD} see={"Voir le projet"} request={"Voir les demandes"} join={"Rejoindre un projet"} idProject={selected._id ||""} menu />
            </div>
          </div>

          <div className="flex gap-5 justify-between">
          <div className='w-1/12 justify-end flex items-center'>
            {renderBeforeButtonS()}
            </div>
            <div className="mt-5 flex gap-5 w-[80vw] flex-wrap justify-center gap-5">
            {filteredDataS.map((step: intStep) => (
              <DashboardCollabStepCard
                step={step}
                key={step._id}
                collab={selected}
              />
            ))}
            </div>
            <div className='w-1/12 justify-left flex items-center'>
              {renderNextButtonS()}
              </div>
          </div>
        </article>
      ) : (
        <article>
          <nav className="flex justify-end">
            <RejoinButton value="Rejoindre un projet" onClick={handleOpenD}/>
          </nav>

          <Alert
              icon={<FontAwesomeIcon icon={faBan} className={"text-brick-300 text-xl"}/>}
              className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
          >
            Aucun projet rejoint.
          </Alert>
        </article>
      )}
      <RejoinModal join={"Rejoindre"} open={openD} handleOpen={handleOpenD} />
    </>
  );
}
