/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { intStep } from "../../../services/interfaces/intProject";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModifiableInput from "../elements/Input/ModifiableInput";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SelectDate from "../elements/Select/SelectDate";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStepFromBDD, getStepById, modifyStepToBDD } from "../../../services/api/steps";
import { useEffect, useState } from "react";

type Props = {
  isOwner: boolean;
};
let count = 1;
export default function StepHeader({ isOwner }: Props) {
  console.log("StepHeaderComposant" + count++);
  const navigate = useNavigate();
  const {idStep, idProject} = useParams();

  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    estimEndDate: new Date(),
    budget: 0,
    status:0,
    project: {id:idProject}
  });

  useEffect(() => {
    async function getInfoStep() {
      const tmpStep = await getStepById(idStep);
      setStep(tmpStep);
    }
    getInfoStep();

  }, [idStep]);

  const handleDeleteStep = async () => {
    await deleteStepFromBDD(idStep)
    navigate('/project/' + idProject)
  }

  const handleModifyStep = (data:intStep) => {
    modifyStepToBDD(idStep, data)
  }

  // Render
  return (
    <section className="bloc-1 mb-40">
      <div className="b1-header md:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{step.name}</h1>
        </div>
        <Button onClick={() => handleDeleteStep()}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
          <a className="ml-5">Supprimer le jalon</a>
        </Button>
      </div>

      <div className="b1-body mt-10">
        <div className="b1-body-desc-calendar lg:flex gap-5">
          <Card className="b1-body-desc w-full bg-white">
            <CardBody>
              <Typography variant="h4" className="mb-2">
                Description du jalon
              </Typography>
              <Typography>{step.description}</Typography>
            </CardBody>
          </Card>
        </div>
        <div className="b1-body-budget-status md:flex gap-5 mt-5">
          <div className="basis-1/2">
            <ModifiableInput
              value={"Budget : " + step.budget.toString() + "€"}
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
            <SelectDate state={step} setState={setStep} handleBdd={handleModifyStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
