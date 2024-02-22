import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan, faChevronLeft, faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  Alert, IconButton,
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

export default function DashboardCollab({ collabs, setReload }: Props) {
  const [selected, setSelected] = useState(collabs[0]);

  const handleClick = (collab:intProject) => {
    setSelected(collab);
  }

  const [collabsDisplay, setCollabsDisplay] = useState(collabs.slice(0,5))
  const [current, setCurrent] = useState(0)
  const nextOrBefore = (next: boolean) => {
    if (next) {
      setCurrent(Math.min(current +5, collabs.length))
      setCollabsDisplay(collabs.slice(current, Math.min(current +5, collabs.length)))
    } else {
      setCurrent(Math.max(0, current -5))
      setCollabsDisplay(collabs.slice(Math.max(0, current -5), current))
    }
  }

  const [openD, setOpenD] = useState(false);
  const handleOpenD = () => setOpenD((bool) => !bool);

  return (
    <section className="my-10 mb-28">

        <h2>Mes collaborations</h2>

      {collabs.length > 0 ? (
        <article>
          <nav className="flex">
          
            <div className="ml-20 lg:flex justify-center basis-3/4">
            {current > 0 && <IconButton className='mx-10' onClick={() => nextOrBefore(false)}><FontAwesomeIcon icon={faChevronLeft} /></IconButton>}
              {collabsDisplay.map((collab: intProject) => (
                <button
                key={collab._id}
                onClick={() => handleClick(collab)}
                  className={
                    "px-10 rounded-none border-0 border-b-2 border-b-marine-100 " +
                    (collab._id === selected._id && "border-b-marine-300 font-extrabold")
                  }
                >
                  {collab.name}
                </button>
              ))}
              {current != collabs.length && <IconButton className='mx-10' onClick={() => nextOrBefore(true)}><FontAwesomeIcon icon={faChevronRight} /></IconButton>}
            </div>
            
            <div className="flex basis-1/4 justify-end items-center gap-2">
              <MenuCollab handleOpenD={handleOpenD} see={"Voir le projet"} request={"Voir les demandes"} join={"Rejoindre un projet"} setReload={setReload} idProject={selected._id ||""} menu />
            </div>
          </nav>

          <div className="mt-5 flex gap-5 flex-wrap justify-center">
            {selected.steps.map((step: intStep) => (
              <DashboardCollabStepCard
                step={step}
                key={step._id}
                collab={selected}
              />
            ))}
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
    </section>
  );
}
