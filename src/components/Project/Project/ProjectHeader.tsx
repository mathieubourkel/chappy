/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { intProject } from "../../../services/interfaces/intProject";
import { Link } from "react-router-dom";
import calendar from "../../../assets/img/calendar.webp";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faFolderOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ProjectDisplayCode } from "../Modals/ProjectDisplayCode";
import SelectInput from "../Buttons/SelectInput";
import DisplayInput from "../Buttons/DisplayInput";
import ModifyInput from "../Buttons/ModifyInput";

type Props = {
  project: intProject;
  setProject: (project: intProject) => void;
  isOwner: boolean;
};
export default function ProjectResume({ project, setProject, isOwner }: Props) {
  // State
  const [displayBudget, setDisplayBudget] = useState<boolean>(true);
  const status = [
    { name: "En cours", id: 0 },
    { name: "En attente", id: 1 },
    { name: "Terminé", id: 2 },
  ];

  // Render
  return (
    <section className="bloc-1 mb-40">
      <div className="b1-header md:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{project.name}</h1>
        </div>
        <div className="b1-header-buttons flex gap-5">
          <ProjectDisplayCode />
          <Link to="/project/members">
            <Button variant="outlined" className="flex">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <div className="hidden md:flex">Participants</div>
            </Button>
          </Link>
          <Link to="/project/documents">
            <Button className="bg-brick-300 flex">
              <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
              <div className="hidden md:flex">Mes documents</div>
            </Button>
          </Link>
          <Link to="/project/purchases">
            <Button
              className="button-project flex text-brick-300 border-brick-300"
              variant="outlined"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <div className="hidden md:flex">Mes achats</div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="b1-body mt-10">
        <div className="b1-body-desc-calendar lg:flex gap-5">
          <Card className="b1-body-desc basis-1/2 bg-white">
            <CardBody>
              <Typography variant="h4" className="mb-2">
                Description du projet
              </Typography>
              <Typography>{project.description}</Typography>
            </CardBody>
          </Card>
          <div className="b1-body-calendar basis-1/2">
            <img className="hidden lg:flex" src={calendar} />
          </div>
        </div>
        <div className="b1-body-budget-status md:flex gap-5 mt-5">
          {displayBudget ? (
            <DisplayInput
              isOwner={isOwner}
              value={"Budget : " + project.budget.toString() + "€"}
              state={displayBudget}
              setState={setDisplayBudget}
            />
          ) : (
            <ModifyInput
              state={project}
              setState={setProject}
              setDisplay={setDisplayBudget}
              type="number"
              label="budget"
              placeHolder="Entrez le nouveau budget"
            />
          )}
          {/* <SelectInput
            isOwner={isOwner}
            state={status}
            classState="basis-1/2"
            label="Status"
          /> */}
        </div>
      </div>
    </section>
  );
}
