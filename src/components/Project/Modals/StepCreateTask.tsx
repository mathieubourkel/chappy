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
import SelectStatus from "../Buttons/SelectStatus";
import SelectDate from "../Buttons/SelectEstimDate";

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
    category: {name:"", id:0},
    startDate: new Date(),
    estimEndDate: new Date(),
    status: 0,
    comments: [],
    app_users: []
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
                name="category"
                id="category"
                onChange={(e: any) => handleChange(e)}
              />
              <form>
              <SelectStatus
                  isOwner={true}
                  classState="basis-1/2" />
            </form>
              <div className="sm:flex gap-3">
                <SelectDate state={tasks} setState={setTask}/>
                <SelectDate state={tasks} setState={setTask}/>
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
