import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan, faChevronLeft, faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {  useEffect, useState } from "react";
import {
  Alert, IconButton
} from "@material-tailwind/react";
import DashboardCollabStepCard from "../Cards/DashboardCollabStepCard.tsx";
import {
  MenuCollab
} from "../elements/Menu/MenuCollab.tsx";
import RejoinButton from "../elements/Buttons/OpenButton.tsx";
import RejoinModal from "../Modals/RejoinModal.tsx";
import { intProject, intProjects } from "../../../services/interfaces/intProject.tsx";
import { intStep } from "../../../services/interfaces/intStep.tsx";

type Props = {
  collabs: intProjects;
  setReload: (bool:boolean) => void
};

export default function DashboardCollab({ collabs, setReload}: Props) {
  const [selected, setSelected] = useState(collabs[0]);

  const handleClick = (collab:intProject) => {
    setSelected(collab);
    setStepsDisplay(collab.steps.slice(0,5))
  }

  const [collabsDisplay, setCollabsDisplay] = useState(collabs.slice(0,5))
  const [stepsDisplay, setStepsDisplay] = useState(selected.steps.slice(0,5))
  const [current, setCurrent] = useState(5)
  const [currentSteps, setCurrentSteps] = useState(5)
  const [firstTime, setFirstTime] = useState(false)

  useEffect(() => {
    if(firstTime) {
      setCollabsDisplay(collabs.slice(0,5))
      setCurrent(5)
    }
    setFirstTime(true)
    
  }, [collabs, firstTime])

  const nextOrBefore = (next: boolean) => {
    if (next) {
      setCollabsDisplay(collabs.slice(current, Math.min(current +5, collabs.length)))
      setCurrent(current +5)
    } else {
      setCollabsDisplay(collabs.slice(Math.max(0, current -10), current-5))
      setCurrent(current -5)
    }
  }

  const nextOrBeforeSteps = (next: boolean) => {
    if (next) {
      setStepsDisplay(selected.steps.slice(currentSteps, Math.min(currentSteps +5, selected.steps.length)))
      setCurrentSteps(currentSteps +5)
    } else {
      setStepsDisplay(selected.steps.slice(Math.max(0, currentSteps -10), currentSteps-5))
      setCurrentSteps(currentSteps -5)
    }
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
            {(current-5 !=0 && current != 0) && <IconButton className='bg-transparent text-black' onClick={() => nextOrBefore(false)}><FontAwesomeIcon icon={faChevronLeft} /></IconButton>}
            </div>
            <div className="flex justify-center w-full ml-5 w-[80vw] sm:ml-0 lg:max-w-[50vw]">
              {collabsDisplay.map((collab: intProject) => (
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
              {current < collabs.length && current+5 != collabs.length && <IconButton className='bg-transparent text-black' onClick={() => nextOrBefore(true)}><FontAwesomeIcon icon={faChevronRight} /></IconButton>}
              </div>
            </nav>
            
            <div className="flex basis-1/4 my-5 lg:my-0 2xl:justify-end justify-center items-center gap-2">
              <MenuCollab handleOpenD={handleOpenD} see={"Voir le projet"} request={"Voir les demandes"} join={"Rejoindre un projet"} setReload={setReload} idProject={selected._id ||""} menu />
            </div>
          </div>

          <div className="flex gap-5 justify-between">
          <div className='w-1/12 justify-end flex items-center'>
            {(currentSteps-5 !=0 && currentSteps != 0) && <IconButton className='bg-transparent text-black' onClick={() => nextOrBeforeSteps(false)}><FontAwesomeIcon icon={faChevronLeft} /></IconButton>}
            </div>
            <div className="mt-5 flex gap-5 w-[80vw] flex-wrap justify-center gap-5">
            {stepsDisplay.map((step: intStep) => (
              <DashboardCollabStepCard
                step={step}
                key={step._id}
                collab={selected}
              />
            ))}
            </div>
            <div className='w-1/12 justify-left flex items-center'>
              {currentSteps < selected.steps.length && currentSteps+5 != selected.steps.length && <IconButton className='bg-transparent text-black' onClick={() => nextOrBeforeSteps(true)}><FontAwesomeIcon icon={faChevronRight} /></IconButton>}
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
