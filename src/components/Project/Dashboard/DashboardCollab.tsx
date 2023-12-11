import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RejoinModal from "../Modals/RejoinModal";
import { Alert } from "@material-tailwind/react";
import DashboardCollabStepCard from "../Cards/DashboardCollabStepCard";
import { SelectMenu } from "../elements/Select/SelectMenu.tsx";
import {
  intProject,
  intProjects,
  intStep,
} from "../../../services/interfaces/intProject";
import "./Dash.css";

type Props = {
  collabs: intProjects;
};

export default function DashboardCollab({ collabs }: Props) {
  console.log("DashBoardCollabComposant");
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index);
  };

  return (
    <section className="my-10 mb-28">
      <h2>Mes collaborations</h2>

      {collabs.length > 0 ? (
        <div>
          <div className="flex">
            <div className="ml-20 lg:flex justify-center basis-3/4">
              {collabs.map((collab: intProject, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={
                    "px-10 rounded-none border-0 border-b-2 border-b-marine-100 " +
                    (index === selected && "border-b-marine-300 selected")
                  }
                >
                  {collab.name}
                </button>
              ))}
            </div>
            <div className="flex basis-1/4 justify-end items-center gap-2">
              <SelectMenu
                see={"Voir le projet"}
                request={"Voir les demandes"}
                join={"Rejoindre un projet"}
                idProject={collabs[selected].id}
              />
            </div>
          </div>

          <ul className="mt-10">
            {collabs[selected].project_steps.map((step: intStep) => (
              <DashboardCollabStepCard
                step={step}
                key={step.id}
                collab={collabs[selected]}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <RejoinModal join="Rejoindre" />
          </div>

          <Alert
            icon={
              <FontAwesomeIcon
                icon={faBan}
                className={"text-marine-300 text-xl"}
              />
            }
            className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
          >
            Aucun projet rejoint.
          </Alert>
        </div>
      )}
    </section>
  );
}
