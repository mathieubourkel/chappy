import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping,faFolderOpen,faUser} from "@fortawesome/free-solid-svg-icons";
import ProjectDisplayCode from "../Modals/ProjectDisplayCode";
import { intProjectLight } from "../../../services/interfaces/intProject";

type Props = {
  project: intProjectLight
  idProject: string | undefined
}

export default function ProjectHeader({project ,idProject} :Props) {

  // Render
  return (
      <section className="b1-header lg:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{project.name}</h1>
        </div>
        <div className="b1-header-buttons flex gap-5 items-center">
          <ProjectDisplayCode />
          <Link to={"/project/"+ idProject + "/members"}>
            <Button variant="outlined" className="flex">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <div className="hidden md:flex">Participants</div>
            </Button>
          </Link>
          <Link to={"/project/"+ idProject + "/documents"}>
            <Button className="bg-brick-300 flex">
              <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
              <div className="hidden whitespace-nowrap md:flex">Mes documents</div>
            </Button>
          </Link>
          <Link to={"/project/"+ idProject + "/purchases"}>
            <Button
              className="button-project flex text-brick-300 border-brick-300"
              variant="outlined"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <div className="hidden whitespace-nowrap md:flex">Mes achats</div>
            </Button>
          </Link>
        </div>
      </section>

  );
}
