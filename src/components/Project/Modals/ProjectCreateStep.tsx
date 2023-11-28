/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,Input,Textarea,} from "@material-tailwind/react";
import { FormEvent, InputEvent, intStep, intSteps } from "../../../services/interfaces/intProject";
import CreateButton from "../Buttons/CreateButton";

type Props = {
  steps: intSteps;
  setStep: (steps: intSteps) => void;
};

export default function ProjectCreateStep({ steps, setStep }: Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [form, setForm] = useState<intStep>({
    name: "",
    description: "",
    budget: 0,
    startDate: "Date",
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStep([...steps, form]);
    setForm({ name: "", description: "", budget: 0, startDate: "Date" });
  }

  return (
    <div>
      <CreateButton handleClick={handleOpen} value="Créer" />
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" color="blue-gray">
                Créer un jalon
              </Typography>
              <Input
                label="Nom du jalon"
                size="lg"
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Textarea
                label="Description"
                size="lg"
                name="description"
                id="description"
                onChange={(e: any) => handleChange(e)}
              />
              <div className="sm:flex gap-3">
                <Input
                  label="Budget"
                  size="lg"
                  crossOrigin={undefined}
                  type="number"
                  name="budget"
                  id="budget"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
                <Input
                  label="Date de début"
                  size="lg"
                  crossOrigin={undefined}
                  name="startTime"
                  id="startTime"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button variant="gradient" onClick={handleOpen} type="submit">
                Créer
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
