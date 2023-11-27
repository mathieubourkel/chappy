import {
  intProject,
  intProjects,
  intStep,
  intSteps,
} from "../../../services/interfaces/intProject";
import StepCard from "../Cards/StepCard";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dash.css";
import { useState } from "react";
import CreateButton from "../Buttons/CreateButton";

type Props = {
  projects: intProjects;
  steps: intSteps;
};

export default function DashboardProjects({ projects, steps }: Props) {
  const [selected, setSelected] = useState(0);

  function handleClick(index: number) {
    setSelected(index);
  }
  return (
    <section className="bloc-2 my-40">
      <div className="b2-header-title">
        <h2>Mes projets</h2>
      </div>

      {projects.length > 0 ? (
        <div>
          <div className="flex">
            <div className="ml-20 flex justify-center basis-3/4 ">
              {projects.map((project: intProject, index: number) => (
                <div key={index}>
                  {index === selected ? (
                    <button
                      key={index}
                      onClick={() => handleClick(index)}
                      className="text-brick-300 px-10 rounded-none border-0 border-b-2 border-b-brick-300"
                    >
                      <div className="selected ">{project.name}</div>
                    </button>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleClick(index)}
                      className="text-brick-300 px-10 rounded-none border-0 border-b-2 border-b-brick-200"
                    >
                      <div>{project.name}</div>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end basis-1/4">
            <CreateButton value="Créer" />
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {steps.map((step: intStep, index: number) => (
              <StepCard step={step} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
          <CreateButton value="Créer"/>
          </div>
          <div className="bg-white flex items-center rounded-xl mt-10 p-5 gap-5">
            <FontAwesomeIcon icon={faBan} />
            <p>Aucun projet en cours</p>
          </div>
        </div>
      )}
    </section>
  );
}
