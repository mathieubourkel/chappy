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
} from "@material-tailwind/react";
import { FormEvent, InputEvent, intTask, intTasks } from "../../../services/interfaces/intProject";
import CreateButton from "../Buttons/CreateButton";

type Props = {
  tasks: intTasks;
  setTask: (tasks: intTasks) => void;
};

export default function StepCreateTask({ tasks, setTask }: Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intTask>({
    name: "",
    description: "",
    categorie: "",
    startDate: "",
    endDate: "",
    status: "En cours",
    comments: [],
    users: []
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTask([...tasks, form]);
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
                name="categorie"
                id="categorie"
                onChange={(e: any) => handleChange(e)}
              />
              <div className="sm:flex gap-3">
                <Input
                  label="Date de début"
                  size="lg"
                  crossOrigin={undefined}
                  name="startDate"
                  id="startDate"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
                <Input
                  label="Date de fin"
                  size="lg"
                  crossOrigin={undefined}
                  name="endDate"
                  id="endDate"
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
