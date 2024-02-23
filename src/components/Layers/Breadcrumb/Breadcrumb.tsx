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
import { intStep } from "../../../services/interfaces/intStep";

type Props = {
    nameProject?:string,
    idProject?: string
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
                    className="text-marine-100 hover:!text-marine-300 w-32 lg:w-full truncate">
                    {nameProject}</NavLink></>
            }

            { step && <>
                <div
                    className="text-marine-100 hover:!text-marine-300 mx-2">/
                </div>

                <Link
                    to={"/project/" +
                        step.project._id +
                        "/step/" + step._id}
                    className="text-marine-100 hover:!text-marine-300 md:mx-2 w-32 lg:w-full truncate">
                    {step.name}
                </Link></>
            }

        </Breadcrumbs>
    );
}
