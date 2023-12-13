import {
    Breadcrumbs
} from "@material-tailwind/react";
import {Link, NavLink} from "react-router-dom";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faHouse
} from "@fortawesome/free-solid-svg-icons";
import {
    intStep
} from "../../../services/interfaces/intProject.tsx";

type Props = {
    nameProject?:string,
    idProject?: string | number | undefined
    step?:intStep
}

export default function Breadcrumb({nameProject, idProject, step}:Props) {

    return (
        <Breadcrumbs separator={""} className={"p-0 my-5"}>
            <Link to={"/"} className="text-marine-100 hover:!text-marine-300">
                <FontAwesomeIcon icon={faHouse} />
            </Link> <div className="text-marine-100 hover:!text-marine-300">/</div>
            <Link to={"/"} className="text-marine-100 hover:!text-marine-300">
               Dashboard
            </Link>
            { idProject && <><div className="text-marine-100 hover:!text-marine-300 mr-2">/</div>
                <NavLink
                    to={"/project/" + idProject}
                    className="text-marine-100 hover:!text-marine-300">
                    {nameProject}</NavLink></>
            }

            { step && <>
                <div
                    className="text-marine-100 hover:!text-marine-300 mr-2">/
                </div>

                <Link
                    to={"/project/" +
                        step.project.id}
                    className="text-marine-100 hover:!text-marine-300">
                    {step.project.name}
                </Link>

                <div
                    className="text-marine-100 hover:!text-marine-300 mx-2">/
                </div>

                <Link
                    to={"/project/" +
                        step.project.id +
                        "/step/" + step.id}
                    className="text-marine-100 hover:!text-marine-300">
                    {step.name}
                </Link></>
            }

        </Breadcrumbs>
    );
}
