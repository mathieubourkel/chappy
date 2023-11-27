import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  intProject,
  intProjects,
  intStep,
  intSteps,
} from "../../../services/interfaces/intProject";
import {
  faArrowRight,
  faChartPie,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@material-tailwind/react";
import "./Dash.css";
import { useState } from "react";
type Props = {
  projects: intProjects;
  steps: intSteps;
  steps2: intSteps;
};

export default function DashboardCollab({ projects, steps }: Props) {
  const [selected, setSelected] = useState(0);

  function handleClick(index: number) {
    setSelected(index);
  }

  return (
    <section className="bloc-2 my-40">
      <div className="b2-header-title">
        <h2>Mes collaborations</h2>
      </div>
      <div className="flex">
        <div className="flex justify-center w-full">
          {projects.map((project: intProject, index: number) => (
            <div key={index}>
              {index === selected ? (
                <button
                  key={index}
                  className="px-10 rounded-none border-0 border-b-2 border-b-black"
                >
                  <a className="selected">{project.name}</a>
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="px-10 rounded-none border-0 border-b-2 border-b-marine-100"
                >
                  <div>{project.name}</div>
                </button>
              )}
            </div>
          ))}
        </div>
        <Button className="mr-5 flex items-center bg-brick-300">
          <FontAwesomeIcon icon={faSquarePlus} />
          <a className="pl-2 hidden md:flex">Mes demandes</a>
        </Button>
        <Button className="mr-5 flex items-center">
          <FontAwesomeIcon icon={faSquarePlus} />
          <a className="pl-2 hidden md:flex">Rejoindre</a>
        </Button>
      </div>

      {/* projects[selected][steps].map */}
      <ul className="mt-10">
        {steps.map((_step: intStep, index: number) => (
          <li key={index}
            className="flex justify-between mb-5 gap-5
              p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
          >
            <div className="flex gap-5">
              <div>
                <FontAwesomeIcon
                  icon={faChartPie}
                  size="2xl"
                  className="mb-5 text-brick-200"
                />
              </div>
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="flex text-brick-300"
                >
                  <p className="p-2">{steps[index].name}</p>
                </Typography>
                <Typography className="p-2">
                  Dernière mise à jour par : {projects[0].owner}, il reste 3 sur
                  10 tâches à faire
                </Typography>
              </div>
            </div>
            <div className="flex items-center ">
              <Button variant="outlined" className="flex items-center py-2">
                <Typography className="pr-2">Accéder</Typography>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
