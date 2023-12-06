import {
  intProject,
  intProjects,
  intStep,
} from "../../../services/interfaces/intProject";
import StepCard from "../Cards/StepCard";
import {
  faBan, faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dash.css";
import { useState } from "react";
import CreateButton from "../elements/Buttons/CreateButton";
import OpenButton from "../elements/Buttons/OpenButton";
import {Link} from "react-router-dom";
import {
  Alert, Typography
} from "@material-tailwind/react";

type Props = {
  projects: intProjects;
};

export default function DashboardProjects({ projects }: Props) {
  console.log("DashBoardProjectsComposant");
  const [selected, setSelected] = useState(0);

  function handleClick(index: number) {
    setSelected(index);
  }

  return (
    <section className="my-40">
        <h2>Mes projets</h2>

      {projects.length > 0 ? (
        <div>
          <div className="flex">
            <div className="ml-20 md:flex justify-center basis-3/4 ">
              {projects.map((project: intProject, index: number) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={
                    "text-brick-300 px-10 rounded-none border-0 border-b-2 border-b-brick-200 " +
                    (index === selected && "border-b-brick-300 selected")}
                    >
                  {project.name}
                </button>
              ))}
            </div>
            <div className="flex justify-end basis-1/4 gap-5">
              <Link to={"/project/" + projects[selected].id}>
                <OpenButton value="Ouvrir le projet" />
              </Link>
              <Link to="/create-project">
                <CreateButton value="Nouveau projet" />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            {projects[selected].project_steps.map((step: intStep) => (
              <StepCard
                step={step}
                key={step.id}
                idProject={projects[selected].id}
              />
            ))}
            {projects[selected].project_steps.length == 0 &&
                <Alert
                icon={<FontAwesomeIcon icon={faCircleExclamation} className={"text-brick-400 text-xl"}/>}
                className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
            >
              Vous n'avez aucun jalon,

                  <Typography
                    variant="paragraph"
                    className={"inline-block font-semibold text-brick-400 hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer"}
                >
                  <Link to={"/project/" + projects[selected].id}>
                    créer votre premier jalon.
                  </Link>
                </Typography>
            </Alert> }
          </div>

        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <Link to="/create-project">
              <CreateButton value="Nouveau projet" />
            </Link>
          </div>
          <Alert
              icon={<FontAwesomeIcon icon={faBan} className={"text-marine-300 text-xl"}/>}
              className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 my-5"
          >
            Aucun projet en cours.
          </Alert>
        </div>
      )}
    </section>
  );
}
