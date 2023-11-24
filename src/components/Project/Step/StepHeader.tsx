/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { intStep } from "../../../services/interfaces/intProject";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import DisplayInput from "../Buttons/DisplayInput";
import ModifyInput from "../Buttons/ModifyInput";

type Props = {
  step: intStep;
  setStep: (step: intStep) => void;
  isOwner: boolean;
};

export default function StepHeader({ step, setStep, isOwner }: Props) {
  // State
  const [displayBudget, setDisplayBudget] = useState<boolean>(true);
  const [displayDate, setDisplayDate] = useState<boolean>(true);

  // Render
  return (
    <section className="bloc-1 mb-40">
      <div className="b1-header md:flex justify-between">
        <div className="b1-header-title shrink-0">
          <h1>{step.name}</h1>
        </div>
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
          {displayBudget ? (
            <DisplayInput
              isOwner={isOwner}
              value={"Budget : " + step.budget.toString() + "€"}
              state={displayBudget}
              setState={setDisplayBudget}
            />
          ) : (
            <ModifyInput
              type="number"
              label="budget"
              placeHolder="Entrez le nouveau budget"
              state={step}
              setState={setStep}
              setDisplay={setDisplayBudget}
            />
          )}

          {displayDate ? (
            <DisplayInput
              isOwner={isOwner}
              value={"Date de départ : " + step.startDate.toString()}
              state={displayDate}
              setState={setDisplayDate}
            />
          ) : (
            <ModifyInput
              type="text"
              label="startDate"
              placeHolder="Entrez la nouvelle date"
              state={step}
              setState={setStep}
              setDisplay={setDisplayDate}
            />
          )}
        </div>
      </div>
    </section>
  );
}
