import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  intProject,
  intProjects,
  intStep,
  intSteps,
} from "../../../services/interfaces/intProject";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import "./Dash.css";
import { useEffect, useState } from "react";
import DashboardStepCard from "../Cards/DashboardStepCard";
import RejoinModal from "../Modals/RejoinModal";
import DemandsModal from "../Modals/DemandsModal";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

type Props = {
  projects: intProjects;
};

export default function DashboardCollab({ projects }: Props) {
  const [selected, setSelected] = useState(0);
  const [steps, setStep] = useState<intSteps>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/api/project-steps?populate[0]=project&filters[project][id][$eq]=" +
          (selected + 1)
      )
      .then(({ data }) => setStep(data.data))
      .catch((error) => setError(error));
  }, [selected]);

  function handleClick(index: number) {
    setSelected(index);
  }

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  return (
    <section className="bloc-2 my-40">
      <div className="b2-header-title">
        <h2>Mes collaborations</h2>
      </div>
      {projects.length > 0 ? (
        <div>
          <div className="flex">
            <div className="ml-20 lg:flex justify-center basis-3/4">
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
            <div className="md:flex basis-1/4 justify-end items-center">
              <DemandsModal />

              <RejoinModal value="Rejoindre" />
            </div>
          </div>

          <ul className="mt-10">
            {steps.map((_step: intStep, index: number) => (
              <DashboardStepCard
                steps={steps}
                projects={projects}
                index={index}
                key={index}
              />
            ))}
          </ul>
          <Link to={"/project/" + (selected + 1)}>
            <Button>Ouvrir le projet</Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <RejoinModal value="Rejoindre" />
          </div>

          <div className="bg-white flex items-center rounded-xl mt-10 p-5 gap-5">
            <FontAwesomeIcon icon={faBan} />
            <p>Aucun projet rejoint</p>
          </div>
        </div>
      )}
    </section>
  );
}
