import { Link } from "react-router-dom";
import {
    Button, Tooltip,
    Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping,faFolderOpen,faUser} from "@fortawesome/free-solid-svg-icons";
import { intProjectLight } from "../../../services/interfaces/intProject";
import Breadcrumb from "../../Layers/Breadcrumb/Breadcrumb.tsx";
import {MenuProject} from "../elements/Menu/MenuProject.tsx";

type Props = {
  project: intProjectLight
  idProject: string | undefined | number
  isOwner: boolean
}

export default function ProjectHeader({project ,idProject, isOwner} :Props) {
  console.log("ProjectHeaderComposant")
  return (
      <section className="lg:flex justify-between mb-20">
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
          <MenuProject idProject={idProject} project={project} />

            <Tooltip
                content={"Participants"}
                className="lg:hidden bg-marine-300 px-4"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
          <Link to={"/project/"+ idProject + "/members"}>
            <Button variant="outlined" size={"sm"} className="flex text-marine-300 border-marine-300">
              <FontAwesomeIcon icon={faUser} className="lg:mr-2" />
              <span className="hidden lg:inline whitespace-nowrap">Participants</span>
            </Button>
          </Link>
            </Tooltip>

            <Tooltip
                content={"Mes documents"}
                className="lg:hidden bg-brick-300 px-4"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
              <Link to={"/project/"+ idProject + "/documents"}>
                <Button className="bg-brick-300 flex" size={"sm"}>
                  <FontAwesomeIcon icon={faFolderOpen} className="lg:mr-2" />
                  <span className="hidden whitespace-nowrap lg:inline">Mes documents</span>
                </Button>
              </Link>
            </Tooltip>

            <Tooltip
                content={"Mes achats"}
                className="lg:hidden bg-brick-300 px-4"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
              <Link to={"/project/"+ idProject + "/purchases"}>
                <Button
                  className="button-project flex text-brick-300 border-brick-300"
                  variant="outlined" size={"sm"}
                >
                  <FontAwesomeIcon icon={faCartShopping} className="lg:mr-2" />
                  <div className="hidden whitespace-nowrap lg:inline">Mes achats</div>
                </Button>
              </Link>
            </Tooltip>
        </nav>}
      </section>

  );
}
