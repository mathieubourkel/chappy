/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Button,
  Card,
  CardBody, Chip,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import { intStep } from "../../../services/interfaces/intProject";
import {
  faBookOpen,
  faListCheck,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModifiableInput from "../elements/Input/ModifiableInput";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SelectDate from "../elements/Select/SelectDate";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteStepFromBDD,
  modifyStepToBDD,
} from "../../../services/api/steps";
import Breadcrumb from "../../Layers/Breadcrumb/Breadcrumb.tsx";

let count = 1;

type Props = {
  step:intStep,
  setStep: (step:intStep) => void;
  isOwner:boolean
}

export default function StepHeader({step, setStep, isOwner}:Props) {
  console.log("StepHeaderComposant" + count++);
  const navigate = useNavigate();

  const { idStep, idProject } = useParams();

  const handleDeleteStep = async () => {
    await deleteStepFromBDD(idStep);
    navigate("/project/" + idProject);
  };

  const handleModifyStep = (data: intStep) => {
    modifyStepToBDD(idStep, data);
  };

  // Render
  return (
    <section className="mt-20 mb-10">
      <div className="md:flex justify-between items-stretch">
        <div className="shrink-0">
          <Typography
              variant="h1"
              className={"font-bold text-4xl"}
          >
            {step.name}
          </Typography>
          <Breadcrumb step={step} />
        </div>

        <div>
          <Tooltip
              content={"Supprimer le jalon"}
              className="lg:hidden bg-marine-300 px-4"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
          >
            <Button onClick={() => handleDeleteStep()}
                    size={"sm"}
                    className="bg-marine-300">
              <FontAwesomeIcon icon={faXmark} size="xl" className={"mr-2"}/>
              <span className="hidden lg:inline whitespace-nowrap">Supprimer le jalon</span>
            </Button>
          </Tooltip>
        </div>


      </div>

      <article className="mt-10">
        <div>
          <Alert className={"mb-5 bg-brick-300 p-5"}>
            <FontAwesomeIcon
                icon={faListCheck}
                className={"mr-5 text-light-100"}
            />

            <span>
              {step.step_tasks.length > 0 ? `Vous avez actuellement ${step.step_tasks.length} ${step.step_tasks.length == 1 ? "tâche ouverte" : " tâches ouvertes"} dans ce jalon.`  : "Vous n'avez aucune tâche ouverte sur ce jalon"}

            </span>
          </Alert>
          <Card className="custom-block">
            <CardBody
                className={"custom-project-body custom-scroll"}>
              <div
                  className={"flex gap-2 items-center"}>
                <FontAwesomeIcon
                    icon={faBookOpen}
                    className={"text-marine-300 text-xl"}
                />
                <Chip
                    variant="ghost"
                    value="Description du jalon"
                    className={"w-full bg-marine-100/10 text-marine-300"}
                />
              </div>
              <Typography type={"p"}
                          className={"pt-3"}>
                {step.description}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div
            className="b1-body-budget-status md:flex gap-5 mt-5">
          <div className="basis-1/2">
            <ModifiableInput
                value={"Budget : " +
                    step.budget.toString() + "€"}
                type="number"
                label="budget"
                placeHolder="Entrez le nouveau budget"
                state={step}
                setState={setStep}
                isOwner={isOwner}
                handleBdd={handleModifyStep}
            />
          </div>
          <div className="basis-1/2 ">
            <SelectDate
              state={step}
              setState={setStep}
              handleBdd={handleModifyStep}
            />
          </div>
        </div>
      </article>
    </section>
  );
}
