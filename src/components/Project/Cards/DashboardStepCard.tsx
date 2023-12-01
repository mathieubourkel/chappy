import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { intProjects, intStep } from "../../../services/interfaces/intProject";
import AccederButton from "../Buttons/AccederButton";
import { Link } from "react-router-dom";

type Props = {
    step: intStep,
    projects: intProjects,
    index:number
    idProject: number | undefined
}

export default function DashboardStepCard({step, idProject}:Props) {
  return (
    <li
      className="md:flex justify-between mb-5 gap-5
              p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
    >
      <div className="flex gap-5">
        <div>
          <FontAwesomeIcon
            icon={faChartPie}
            size="2xl"
            className="mb-5 text-brick-200"
          />
        </div>
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex text-brick-300"
          >
            <p className="p-2 font-bold">{step.name}</p>
          </Typography>
          <Typography className="p-2">
            Dernière mise à jour par : 
            {/* <a className="font-bold">{projects[index].app_user.id}</a> */}
            , il reste <a className="font-bold">3 sur 10
            tâches à faire</a>
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-end">
      <Link to={"/project/"+ idProject +"/step/" + step.id}>
        <AccederButton />
        </Link>
        
      </div>
    </li>
  );
}
