/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Option,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Select,
} from "@material-tailwind/react";
import {
  FormEvent,
  InputEvent,
  intProject,
  intStep,
} from "../../../services/interfaces/intProject";
import CreateButton from "../Buttons/CreateButton";
import { Status } from "../../../services/interfaces/Status";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  project: intProject;
  setProject: (project: intProject) => void;
};

export default function ProjectCreateStep({ project, setProject }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [form, setForm] = useState<intStep>({
    name: "",
    description: "",
    budget: 0,
    estimEndDate: null,
    id: 0,
    status: 0,
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tmpSteps = [...project.project_steps];
    console.log(tmpSteps);
    tmpSteps.push(form);
    setProject({ ...project, project_steps: tmpSteps });
    setForm({
      name: "",
      description: "",
      budget: 0,
      estimEndDate: null,
      id: 0,
      status: 0,
    });
  }

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value });
  };

  const handleDate = (value: any) => {
    setForm({ ...form, estimEndDate: value.startDate });
  };

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
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
                  onChange={handleDate}
                  value={{
                    startDate: form.estimEndDate,
                    endDate: form.estimEndDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
              </div>
              <Select
                className="rounded-xl p-2 bg-white"
                value={Status[form.status]}
                label="status"
                name="status"
                id="status"
                onChange={(value: string | undefined) => handleStatus(value)}
              >
                {Status.map((i: string, indexS: number) => (
                  <Option key={indexS} value={i}>
                    {i}
                  </Option>
                ))}
              </Select>
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
