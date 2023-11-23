/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { intProject, FormEvent } from "../../services/interfaces/intProject";
import { Link } from "react-router-dom";
import calendar from "../../assets/img/calendar.webp";
import {
  Select,
  Option,
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faCode,
  faFolderOpen,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  project: intProject;
  setProject: (project: intProject) => void;
};
export default function Resume({ project, setProject }: Props) {

  // State
  const [displayBudget, setDisplayBudget] = useState<boolean>(true);
  const status = [
    {name: "En cours", id: 0},
    {name: "En attente", id: 1},
    {name: "Terminé", id: 2}
  ];

  // Functions
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    const newBudget = e.currentTarget.budget.value;
    setProject({ ...project, budget: newBudget });
    handleDisplay();
  }

  function handleDisplay() {
    displayBudget ? setDisplayBudget(false) : setDisplayBudget(true);
  }

  // Render
  return (
    <section className="bloc-1 mb-40">
      <div className="b1-header md:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{project.name}</h1>
        </div>
        <div className="b1-header-buttons flex gap-5">
          <Link to="/project/">
            <Button>
              <FontAwesomeIcon icon={faCode} className="mr-2" />
              <div className="hidden md:flex">Code projet</div>
            </Button>
          </Link>

          <Link to="/project/members">
            <Button variant="outlined">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <div className="hidden md:flex">Participants</div>
            </Button>
          </Link>
          <Link to="/project/documents">
            <Button className="bg-brick-300">
              <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
              <div className="hidden md:flex">Mes documents</div>
            </Button>
          </Link>
          <Link to="project/purchases">
            <Button
              className="button-project text-brick-300 border-brick-300"
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
            <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
              <div className="flex w-full rounded-md bg-white">
                <p className="p-2">
                  {"Budget : " + project.budget.toString() + "€"}
                </p>
              </div>
              <div className="flex justify-end">
                <IconButton onClick={handleDisplay} ripple={true}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              </div>
            </div>
          ) : (
            <form
              className="b1-body-budget flex basis-1/2 gap-2"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full bg-white rounded-md">
                <Input
                  className="p-2"
                  type="number"
                  name="budget"
                  id="budget"
                  placeholder="Entrez le nouveau budget"
                  crossOrigin={undefined}
                />
              </div>
              <IconButton
                className="basis-1/12 flex justify-end"
                ripple={true}
                type="submit"
              >
                <FontAwesomeIcon icon={faCheck} />
              </IconButton>
            </form>
          )}

          <div className="b1-body-status basis-1/2">
            <Select className="bg-white" label="Status">
                {status.map((element:any, index:number) => (
                    <Option key={index}>{element.name}</Option>
                ))}     
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
