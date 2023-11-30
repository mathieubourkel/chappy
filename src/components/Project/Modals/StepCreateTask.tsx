/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Select,
  Option
} from "@material-tailwind/react";
import {
  FormEvent,
  InputEvent,
  intTask,
  intTasks,
} from "../../../services/interfaces/intProject";
import CreateButton from "../Buttons/CreateButton";
import Datepicker from "react-tailwindcss-datepicker";
import { Status } from "../../../services/interfaces/Status";

type Props = {
  tasks: intTasks;
  setTasks: (tasks: intTasks) => void;
};

export default function StepCreateTask({ tasks, setTasks }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intTask>({
    name: "",
    description: "",
    category: { name: "", id: 0 },
    rangeDate: {
      startDate: new Date(),
      endDate: new Date(),
    },
    status: 0,
    comments: [],
    app_users: [],
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(form);
    setTasks([...tasks, form]);
  }

  const handleDate = (value: any) => {
    setForm({ ...form, rangeDate: value });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value });
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
                Créer une tâche
              </Typography>
              <Input
                label="Nom de la tâche"
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
              <Textarea
                label="Catégorie"
                size="lg"
                name="category"
                id="category"
                onChange={(e: any) => handleChange(e)}
              />
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
              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
                  onChange={handleDate}
                  value={form.rangeDate}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
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
