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
import { useEffect, useState } from "react";
import CreateButton from "../Buttons/CreateButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";

type Props = {
  projects: intProjects;
};

export default function DashboardProjects({ projects }: Props) {
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
        <h2>Mes projets</h2>
      </div>

      {projects.length > 0 ? (
        <div>
          <div className="flex">
            <div className="ml-20 md:flex justify-center basis-3/4 ">
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
            <div className="md:flex justify-end basis-1/4">
              <Link to="/create-project">
                <CreateButton value="Créer" />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {steps.map((step: intStep, index: number) => (
              <StepCard step={step} key={index} id={index} />
            ))}
          </div>
          <Link to={"/project/" + (selected + 1)}>
            <Button>Ouvrir le projet</Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <Link to="/create-project">
              <CreateButton value="Créer" />
            </Link>
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
