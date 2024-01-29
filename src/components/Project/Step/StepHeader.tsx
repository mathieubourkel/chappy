/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Card,
  CardBody, Chip,
  Typography
} from "@material-tailwind/react";
import { intStep, intStepNew } from "../../../services/interfaces/intProject.tsx";
import {
  faBookOpen,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModifiableInput from "../elements/Input/ModifiableInput.tsx";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SelectDate from "../elements/Select/SelectDate.tsx";
import { useParams } from "react-router-dom";
import {
  modifyStepToBDD,
} from "../../../services/api/steps.ts";
import Breadcrumb from "../../Layers/Breadcrumb/Breadcrumb.tsx";
import ModifiableDescription
  from "../elements/Input/ModifiableDescription.tsx";

type Props = {
  step:intStepNew,
  setStep: (step:intStepNew) => void;
  isOwner:boolean
}

export default function StepHeader({step, setStep, isOwner}:Props) {

  const { idStep } = useParams();

  // const handleDeleteStep = async () => {
  //   await deleteStepFromBDD(idStep);
  //   navigate("/project/" + idProject);
  // };

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
          <Breadcrumb step={step} idProject={step.project.id} nameProject={step.project.name} />
        </div>

      </div>

      <article className="mt-10">
          <div>
            <Alert
              className={"mb-5 bg-brick-300 p-5"}>
            <FontAwesomeIcon
                icon={faListCheck}
                className={"mr-5 text-light-100"}
            />

            <span>
              {step.tasks.length > 0 ?
                  `Vous avez actuellement ${step.tasks.length} ${step.tasks.length ==
                  1 ? "tâche ouverte" :
                      " tâches ouvertes"} dans ce jalon.` :
                  "Vous n'avez aucune tâche ouverte sur ce jalon"}

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
              <div className={"pt-3"}>
                <ModifiableDescription
                    label={"description"}
                    placeHolder={"Saisissez la description de votre jalon"}
                    state={step}
                    value={step.description}
                    setState={setStep}
                    isOwner={isOwner}
                    handleBdd={handleModifyStep}/>
              </div>
            </CardBody>
          </Card>
        </div>
        <div
            className="md:flex gap-5 mt-5">
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
