/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { intProject } from "../../services/interfaces/intProject";
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
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type Props = {
  project: intProject;
  setProject: (project: intProject) => void;
};
export default function Resume({ project, setProject }: Props) {
  const [displayBudget, setDisplayBudget] = useState<boolean>(true);
  const [form, setForm] = useState<number>(0);

  function handleChange(e: any) {
    setForm(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setProject({ ...project, budget: form });
    handleDisplay();
  }

  function handleDisplay() {
    displayBudget ? setDisplayBudget(false) : setDisplayBudget(true);
  }

  return (
    <section className="bloc-1">
      <div className="b1-header flex justify-between">
        <div className="b1-header-title">
          <h1>{project.name}</h1>
        </div>
        <div className="b1-header-buttons">
          <Button>Code projet</Button>
          <Link to="/project/members">
            <Button className="ml-5" variant="outlined">
              Les participants
            </Button>
          </Link>
          <Link to="/project/documents">
            <Button className="ml-5 bg-brick-300">
              Mes documents
            </Button>
          </Link>
          <Link to="project/purchases">
            <Button
              className="button-project ml-5 text-brick-300 border-brick-300"
              variant="outlined"
            >
              Les achats
            </Button>
          </Link>
        </div>
      </div>

      <div className="b1-body">
        <div className="b1-body-desc-calendar flex mt-5">
          <Card className="b1-body-desc basis-1/2 bg-white mr-5">
            <CardBody>
              <Typography variant="h5" className="mb-2">
                Description du projet
              </Typography>
              <Typography>{project.description}</Typography>
            </CardBody>
          </Card>
          <div className="b1-body-calendar basis-1/2">
            <img src={calendar}></img>
          </div>
        </div>
        <div className="b1-body-budget-status flex mt-5">
          {displayBudget ? (
            <div className="b1-body-budget flex  basis-1/2 mr-5">
              <div className="bg-white flex justify-between basis-11/12 rounded-md">
                <p className="p-2">Budget : </p>
                <p className="p-2">{project.budget}</p>
                <p className="p-2">€</p>
              </div>
              <div className="basis-1/12 flex justify-end">
                <IconButton onClick={handleDisplay} ripple={true}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              </div>
            </div>
          ) : (
              <form className="b1-body-budget flex justify-between basis-1/2 mr-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="bg-white flex justify-between bg-white basis-11/12 rounded-md">
                <p className="p-2">Budget : </p>
                <input
                  className="basis-8/2 p-2"
                  type="number"
                  name="budget"
                  id="budget"
                  placeholder={project.budget.toString()}
                  onChange={(e) => handleChange(e)}
                />
                <p className="p-2">€</p>
                </div>
                <IconButton className="basis-1/12 flex justify-end" ripple={true} type="submit">
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              </form>
          )}

          <div className="b1-body-status basis-1/2 w-72">
            <Select className="bg-white" label="Status">
              <Option>En cours</Option>
              <Option>Terminé</Option>
              <Option>En attente</Option>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
