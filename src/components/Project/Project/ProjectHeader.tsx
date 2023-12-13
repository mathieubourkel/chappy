import { Link } from "react-router-dom";
import {
    Button,
    Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping,faFolderOpen,faUser} from "@fortawesome/free-solid-svg-icons";
import { intProject } from "../../../services/interfaces/intProject";
import Breadcrumb from "../../Layers/Breadcrumb/Breadcrumb.tsx";
import {MenuProject} from "../elements/Menu/MenuProject.tsx";

type Props = {
  project: intProject
  idProject: string | undefined | number
  isOwner: boolean
}

export default function ProjectHeader({project ,idProject, isOwner} :Props) {
  console.log("ProjectHeaderComposant")
  return (
      <section className="lg:flex justify-between">
        <div>
            <Typography
                variant="h1"
                className={"font-bold text-4xl"}
            >
                {project.name}
            </Typography>

            <Breadcrumb nameProject={project.name} idProject={project.id}/>

        </div>
        {isOwner && 
        <nav className="flex gap-2 items-center justify-center lg:justify-end">
          <MenuProject />
          <Link to={"/project/"+ idProject + "/members"}>
            <Button variant="outlined" size={"sm"} className="flex">
              <FontAwesomeIcon icon={faUser} className="lg:mr-2" />
              <span className="hidden lg:inline whitespace-nowrap">Participants</span>
            </Button>
          </Link>
          <Link to={"/project/"+ idProject + "/documents"}>
            <Button className="bg-brick-300 flex" size={"sm"}>
              <FontAwesomeIcon icon={faFolderOpen} className="lg:mr-2" />
              <span className="hidden whitespace-nowrap lg:inline">Mes documents</span>
            </Button>
          </Link>
          <Link to={"/project/"+ idProject + "/purchases"}>
            <Button
              className="button-project flex text-brick-300 border-brick-300"
              variant="outlined" size={"sm"}
            >
              <FontAwesomeIcon icon={faCartShopping} className="lg:mr-2" />
              <div className="hidden whitespace-nowrap lg:inline">Mes achats</div>
            </Button>
          </Link>
        </nav>}
      </section>

  );
}
