import { Card, CardBody, Typography } from "@material-tailwind/react";
import { intProject, intStep } from "../../../services/interfaces/intProject";
import AccederButton from "../elements/Buttons/AccederButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

type Props = {
  step: intStep;
  collab: intProject;
};

export default function DashboardCollabStepCard({ step, collab }: Props) {
  console.log("DashBoardCOllabStepCard");
  return (
    <Card className="md:flex justify-between custom-task w-full md:w-[92lvh]">
      <CardBody className="custom-task-body flex justify-between items-center">
        <div>
          <div className={"flex gap-2 items-center"}>
            <FontAwesomeIcon icon={faChartPie} className={"text-sm"} />
            <Typography className="custom-subt mb-1" textGradient>
              <span className="font-bold">3 sur 10 tâches à faire</span>
            </Typography>
          </div>

          <Typography variant="h5" className="flex text-brick-300">
            <p className="font-bold">{step.name}</p>
          </Typography>
          <Typography className="mt-2">
            Propriétaire :
            <span className="font-bold">
              {" " + collab.owner.firstName + " " + collab.owner.lastName}
            </span>
          </Typography>
        </div>

        <Link to={"/project/" + collab.id + "/step/" + step.id}>
          <AccederButton />
        </Link>
      </CardBody>
    </Card>
  );
}
