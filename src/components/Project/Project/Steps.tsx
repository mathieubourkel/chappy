import {
  Button,
  Card,
  IconButton,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { intStep, intSteps } from "../../../services/interfaces/intProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChartPie,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ProjectCreateStep } from "../Modals/ProjectCreateStep";

type Props = {
  steps: intSteps;
  setStep: (steps:intSteps) =>void;
 
};

export default function Steps({ steps, setStep}: Props) {
  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les jalons</h2>
        </div>
        <div className="b2-header-buttons flex">
          <div>
            <ProjectCreateStep steps={steps} setStep={setStep}/>
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="b2-body flex flex-wrap gap-10 mt-10">
        {steps.map((step: intStep, index: number) => (
          <Card
            className="mt-6 w-96 border-solid border-4 border-b-brick-200"
            key={index}
          >
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
                className="text-brick-300 border-brick-300"
              >
                <a className="pr-2">Accéder</a>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
              </Link>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
