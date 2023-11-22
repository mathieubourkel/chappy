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
    <section className="bloc-1 mb-40">
      <div className="b1-header flex justify-between">
        <div className="b1-header-title">
          <h1>{project.name}</h1>
        </div>
        <div className="b1-header-buttons flex flex-wrap gap-5">
          <Link to="/project/">
            <Button>
              <FontAwesomeIcon icon={faCode} className="mr-2" />
              Code projet
            </Button>
          </Link>
          
          <Link to="/project/members">
            <Button variant="outlined">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Les participants
            </Button>
          </Link>
          <Link to="/project/documents">
            <Button className="bg-brick-300">
              <FontAwesomeIcon icon={faFolderOpen} className="mr-2"/>
              Mes documents
            </Button>
          </Link>
          <Link to="project/purchases">
            <Button
              className="button-project text-brick-300 border-brick-300"
              variant="outlined"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2"/>
              Mes achats
            </Button>
          </Link>
        </div>
      </div>

      <div className="b1-body mt-10">
        <div className="b1-body-desc-calendar flex gap-5">
          <Card className="b1-body-desc basis-1/2 bg-white">
            <CardBody>
              <Typography variant="h4" className="mb-2">
                Description du projet
              </Typography>
              <Typography>{project.description}</Typography>
            </CardBody>
          </Card>
          <div className="b1-body-calendar basis-1/2">
            <img src={calendar}/>
          </div>
        </div>
        <div className="b1-body-budget-status flex gap-5 mt-5">
          {displayBudget ? (
            <div className="b1-body-budget flex basis-1/2 gap-2">
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
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex w-full bg-white rounded-md">
                <Input
                  className="p-2"
                  type="number"
                  name="budget"
                  id="budget"
                  placeholder="Entrez le nouveau budget"
                  onChange={(e) => handleChange(e)}
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
