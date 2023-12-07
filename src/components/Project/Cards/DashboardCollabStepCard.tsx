import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { intProject, intStep } from "../../../services/interfaces/intProject";
import AccederButton from "../elements/Buttons/AccederButton";
import { Link } from "react-router-dom";

type Props = {
    step: intStep,
    collab: intProject
}

export default function DashboardCollabStepCard({step, collab}:Props) {
  console.log('DashBoardCOllabStepCard')
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
            Propriétaire : 
            <a className="font-bold">{collab.user.firstName +' ' + collab.user.lastName}</a>
            , il reste <a className="font-bold">3 sur 10
            tâches à faire</a>
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-end">
      <Link to={"/project/"+ collab.id +"/step/" + step.id}>
        <AccederButton />
        </Link>
        
      </div>
    </li>
  );
}
