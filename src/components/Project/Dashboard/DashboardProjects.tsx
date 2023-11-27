import { Button } from "@material-tailwind/react";
import {
  intProject,
  intProjects,
  intStep,
  intSteps,
} from "../../../services/interfaces/intProject";
import StepCard from "../Cards/StepCard";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dash.css";
import { useState } from "react";
type Props = {
  projects: intProjects;
  steps: intSteps;
  steps2: intSteps;
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
      <div className="flex">
        <div className="flex justify-center w-full ">
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
      
      <Button className="mr-5 bg-brick-300 flex items-center">
        <FontAwesomeIcon icon={faSquarePlus} />
        <a className="pl-2 hidden md:flex">Créer</a>
      </Button>
      </div>
      <div className="flex flex-wrap gap-10">
        {steps.map((step: intStep, index: number) => (
          <StepCard step={step} key={index} />
        ))}
      </div>
    </section>
  );
}
