import { Link } from "react-router-dom";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Card,CardBody,CardFooter,Typography,} from "@material-tailwind/react";
import { intStep } from "../../services/interfaces/intStep";
import { enumStatus } from "../../services/enums/status.enum";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  step: intStep;
  idProject: number | undefined | string;
};

export default function CardStep({ step, idProject }: Props) {
  const truncatedDescription =
    step.description.substring(0, 75) +
    (step.description.length >= 75 ? "..." : "");

  return (
    <Card className="mt-3 w-[70vw] custom-card">
      <CardBody className={"custom-card-body"}>
        <div className={"flex gap-2 items-center"}>
          <FontAwesomeIcon icon={faBarsProgress} />
          <Typography className="custom-subt mb-1" textGradient>
            Jalon {enumStatus[step.status].label}
          </Typography>
        </div>
        <Typography variant="h3" className="mb-2 truncate font-bold text-marine-300">
          {step.name}
        </Typography>
        <Typography variant="paragraph" className="truncate text-text-100 min-h-[2rem]">
          {truncatedDescription}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <Link to={`/project/${idProject}/step/${step._id}`}>
          <MagicButton type={ButtonTypeEnum.ACCESS} reverse wrap={'lg'}/>
        </Link>
      </CardFooter>
    </Card>
  );
}
