import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { intProjects, intSteps } from "../../../services/interfaces/intProject";
import AccederButton from "../Buttons/AccederButton";

type Props = {
    steps: intSteps,
    projects: intProjects,
    index:number
}

export default function DashboardStepCard({steps, projects, index}:Props) {
  return (
    <li
      className="flex justify-between mb-5 gap-5
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
            <p className="p-2 font-bold">{steps[index].name}</p>
          </Typography>
          <Typography className="p-2">
            Dernière mise à jour par : <a className="font-bold">{projects[0].owner}</a>, il reste <a className="font-bold">3 sur 10
            tâches à faire</a>
          </Typography>
        </div>
      </div>
      <div className="flex items-center ">
        <AccederButton />
      </div>
    </li>
  );
}
