import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  intProjectDash,
  intProjectsDash,
  intStep,
} from "../../../services/interfaces/intProject.tsx";
import {
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  Alert,
} from "@material-tailwind/react";
import DashboardCollabStepCard from "../Cards/DashboardCollabStepCard.tsx";
import {
  MenuCollab
} from "../elements/Menu/MenuCollab.tsx";
import RejoinButton from "../elements/Buttons/OpenButton.tsx";
import RejoinModal from "../Modals/RejoinModal.tsx";

type Props = {
  collabs: intProjectsDash;
  setReload: (bool:boolean) => void
};

export default function DashboardCollab({ collabs, setReload }: Props) {
  const [selected, setSelected] = useState(0);

  function handleClick(index: number) {
    setSelected(index);
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
              {collabs.map((collab: intProjectDash, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={
                    "px-10 rounded-none border-0 border-b-2 border-b-marine-100 " +
                    (index === selected && "border-b-marine-300 font-extrabold")
                  }
                >
                  {collab.name}
                </button>
              ))}
            </div>
            <div className="flex basis-1/4 justify-end items-center gap-2">
              <MenuCollab handleOpenD={handleOpenD} see={"Voir le projet"} request={"Voir les demandes"} join={"Rejoindre un projet"} setReload={setReload} idProject={collabs[selected]._id} menu />
            </div>
          </nav>

          <div className="mt-5 flex gap-5 flex-wrap justify-center">
            {collabs[selected].steps.map((step: intStep) => (
              <DashboardCollabStepCard
                step={step}
                key={step.id}
                collab={collabs[selected]}
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
              icon={<FontAwesomeIcon icon={faBan} className={"text-marine-300 text-xl"}/>}
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
