import { faArrowRight, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { intStep } from "../../../services/interfaces/intProject";

type Props = {
  step: intStep;
};

export default function StepCard({ step }: Props) {
  return (
    <Card className="mt-6 w-96 border-solid border-4 border-b-brick-200">
      <CardBody>
        <FontAwesomeIcon icon={faChartPie} size="2xl" className="mb-5" />
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {step.name}
        </Typography>
        <Typography>{step.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <Link to="/project/step">
          <Button
            variant="outlined"
            className="text-brick-300 border-brick-300 flex items-center"
          >
            <Typography className="pr-2">Accéder</Typography>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
