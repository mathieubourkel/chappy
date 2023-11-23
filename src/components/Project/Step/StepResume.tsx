/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormEvent, intStep } from "../../../services/interfaces/intProject";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
    step: intStep
    setStep: (step:intStep) => void;
}

export default function StepResume({step, setStep}:Props) {

  // State
  const [displayBudget, setDisplayBudget] = useState<boolean>(true);
  const [displayDate, setDisplayDate] = useState<boolean>(true);

  // Functions
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    const newBudget = e.currentTarget.budget.value;
    setStep({ ...step, budget: newBudget });
    handleDisplay();
  }

  const handleSubmitDate = (e:FormEvent) => {
    e.preventDefault();
    const newDate = e.currentTarget.startDate.value;
    setStep({ ...step, startDate: newDate });
    handleDisplayDate();
  }

  function handleDisplay() {
    displayBudget ? setDisplayBudget(false) : setDisplayBudget(true);
  }
  function handleDisplayDate() {
    displayDate ? setDisplayDate(false) : setDisplayDate(true);
  }

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
            <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
              <div className="flex w-full rounded-md bg-white">
                <p className="p-2">
                  {"Budget : " + step.budget.toString() + "€"}
                </p>
              </div>
              <div className="flex justify-end">
                <IconButton onClick={handleDisplay} ripple={true}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              </div>
            </div>
          ) : (
            <form
              className="b1-body-budget flex basis-1/2 gap-2"
              onSubmit={handleSubmit}
            >
                <Input
                  className="flex w-full bg-white rounded-md"
                  type="number"
                  name="budget"
                  id="budget"
                  placeholder="Entrez le nouveau budget"
                  crossOrigin={undefined}
                />
              <IconButton
                className="basis-1/12 flex justify-end"
                ripple={true}
                type="submit"
              >
                <FontAwesomeIcon icon={faCheck} />
              </IconButton>
            </form>
          )}

{displayDate ? (
            <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
              <div className="flex w-full rounded-md bg-white">
                <p className="p-2">
                  {"Date de départ : " + step.startDate.toString()}
                </p>
              </div>
              <div className="flex justify-end">
                <IconButton onClick={handleDisplayDate} ripple={true}>
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
              </div>
            </div>
          ) : (
            <form
              className="b1-body-budget flex basis-1/2 gap-2"
              onSubmit={handleSubmitDate}
            >
                <Input
                className="flex w-full bg-white rounded-md"
                  type="text"
                  name="startDate"
                  id="startDate"
                  placeholder="Entrez la nouvelle date"
                  crossOrigin={undefined}
                />
              <IconButton
                className="basis-1/12 flex justify-end"
                ripple={true}
                type="submit"
              >
                <FontAwesomeIcon icon={faCheck} />
              </IconButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
