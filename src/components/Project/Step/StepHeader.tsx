/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import ModifyInput from "../Buttons/ModifiableInput";
import { intStep } from "../../../services/interfaces/intProject";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  isOwner: boolean;
  step: intStep
  setStep: (step:intStep) => void;
};

export default function StepHeader({ isOwner, step, setStep }: Props) {


  function handleDelete() {
    setStep({ name: "", description: "", budget: 0, startDate: "", id:0 });
  }

  // Render
  return (
    <section className="bloc-1 mb-40">
      <div className="b1-header md:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{step.name}</h1>
        </div>
        <Button onClick={() => handleDelete()}>
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
          <ModifyInput
            value={"Budget : " + step.budget.toString() + "€"}
            type="number"
            label="budget"
            placeHolder="Entrez le nouveau budget"
            state={step}
            setState={setStep}
            isOwner={isOwner}
          />

          <ModifyInput
            value={"Date de départ : " + step.startDate.toString()}
            type="text"
            label="startDate"
            placeHolder="Entrez la nouvelle date"
            state={step}
            setState={setStep}
            isOwner={isOwner}
          />
        </div>
      </div>
    </section>
  );
}
