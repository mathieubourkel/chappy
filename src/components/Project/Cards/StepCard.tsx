import { Link } from "react-router-dom";
import {
    faBarsProgress,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import { intStep } from "../../../services/interfaces/intProject";
import AccederButton from "../elements/Buttons/AccederButton";
import {
    enumStatus
} from "../../../services/interfaces/Status.tsx";

type Props = {
  step: intStep;
  idProject:number | undefined | string
};

export default function StepCard({ step, idProject }: Props) {
  console.log('StepCardComposant')
  return (
    <Card className="mt-3 w-96 custom-card">

      <CardBody className={"custom-card-body"}>
          <Typography className="custom-subt mb-2" textGradient>

              <div className={"flex gap-2 items-start"}>
                  <FontAwesomeIcon icon={faBarsProgress} />
                  Jalon {enumStatus[step.status].label}
              </div>

          </Typography>
        <Typography variant="h3" className="mb-2 font-bold text-marine-300">
          {step.name}
        </Typography>
        <Typography variant={"paragraph"} className={"text-text-100"}>{step.description.substring(0, 75)} {step.description.length >= 75 && '...'}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <Link to={"/project/" + idProject + "/step/" + step.id}>
          <AccederButton />
        </Link>
      </CardFooter>
    </Card>
  );
}
