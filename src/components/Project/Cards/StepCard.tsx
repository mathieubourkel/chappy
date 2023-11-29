import { Link } from "react-router-dom";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Card,CardBody,CardFooter,Typography} from "@material-tailwind/react";
import { intStep } from "../../../services/interfaces/intProject";
import AccederButton from "../Buttons/AccederButton";

type Props = {
  step: intStep;
  idProject:number | undefined
};

export default function StepCard({ step, idProject }: Props) {

  return (
    <Card className="mt-6 w-96 border-solid border-4 border-b-brick-200">
      <CardBody>
        <FontAwesomeIcon icon={faChartPie} size="2xl" className="mb-5 text-light-300" />
        <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
          {step.name}
        </Typography>
        <Typography>{step.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <Link to={"/project/" + idProject + "/step/" + step.id}>
          <AccederButton />
        </Link>
      </CardFooter>
    </Card>
  );
}
