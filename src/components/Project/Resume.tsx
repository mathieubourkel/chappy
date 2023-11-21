/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { intProject } from "../../services/interfaces/intProject";
import {Link} from "react-router-dom";
import { Button } from "@material-tailwind/react";

type Props = {
  project: intProject;
  setProject: (project:intProject) => void;
};
export default function Resume({ project, setProject }: Props) {

    const [displayBudget, setDisplayBudget] = useState<boolean>(true);
    const [form, setForm] = useState<number>(0);

    function handleChange(e:any){
        setForm(e.target.value)
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        setProject({...project, budget: form})
        handleDisplay();
    }

    function handleDisplay(){
        displayBudget ? setDisplayBudget(false) : setDisplayBudget(true); 
    }

  return (
    <div className="header-project-nav">
      <div className="header-nav-project">
        <div className="nav-project-name">
          <h1>{project.name}</h1>
        </div>
        <div className="nav-project-buttons">
          <button className="button-project">Code projet</button>
          <Link to="/project/members">
            <button className="button-project">Les participants</button>
          </Link>
          <Link to="/project/documents">
            <button className="button-project">Mes documents</button>
          </Link>
          <Link to="project/purchases">
            <button className="button-project">Les achats</button>
          </Link>
          
        </div>
      </div>
      <div className="header-body-project">
        <div className="header-project-desc half">
          <p>Description du projet : {project.description}</p>
        </div>
        <div className="header-project-planning half">
          <p>planning</p>
        </div>
      </div>
      <div className="header-body2-project">
        {displayBudget ? 
        <div className="header-project-budget half">
          <p>Budget : {project.budget}</p>
            <button onClick={handleDisplay}>
                <a>Modifier</a>
            </button>
        </div> : 
        <div className="header-project-budget half">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="budget">Budget : </label>
                <input className="w-full"  type="number" name="budget" id="budget" placeholder={project.budget.toString()}
                onChange={(e) => handleChange(e)} />
                <Button className='bg-brick-300' type="submit">Modifier</Button>
            </form>
      </div>}
        <div className="header-project-status half">
          <p>{project.status}</p>
        </div>
      </div>
    </div>
  );
}
