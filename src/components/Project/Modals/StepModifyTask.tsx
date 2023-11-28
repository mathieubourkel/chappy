/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, InputEvent, intTask, intTasks } from "../../../services/interfaces/intProject";

type Props = {
  tasks: intTasks;
  setTask: (task: intTasks) => void;
  index: number;
  handleOpen: any;
  open: boolean
};

export default function StepModifyTask({ setTask, tasks, index, handleOpen, open }: Props) {

  
  const [form, setForm] = useState<intTask>({ ...tasks[index] });

  useEffect(() => {
    setForm({ ...tasks[index] });
  }, [index, open, tasks]);

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tempArray = [...tasks];
    tempArray[index] = form;
    setTask(tempArray);
  }

  return (
    <>
      <IconButton
        variant="outlined"
        className="text-brick-300 border-brick-300"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
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
                Modifier la tâche
              </Typography>
              <Input
                label="Nom de la tâche"
                type="text"
                value={form.name}
                size="lg"
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Textarea
                label="Description"
                value={form.description}
                size="lg"
                name="description"
                id="description"
                onChange={(e:any) => handleChange(e)}
              />
              <Textarea
                label="Catégorie"
                value={form.categorie}
                size="lg"
                name="categorie"
                id="categorie"
                onChange={(e: any) => handleChange(e)}
              />
              <div className="sm:flex gap-3">
                <Input
                  label="Date de début"
                  value={form.startDate}
                  size="lg"
                  crossOrigin={undefined}
                  name="startDate"
                  id="startDate"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
                <Input
                  label="Date de fin"
                  value={form.endDate}
                  size="lg"
                  crossOrigin={undefined}
                  name="endDate"
                  id="endDate"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
              <p>Participants</p>
          <div className="flex gap-10">
            {tasks[index].users.map((user: string, index: number) => (
              <Input
                key={index}
                label="Participants"
                value={user}
                size="lg"
                name="participants"
                id="participants"
                crossOrigin={undefined}
              />
            ))}
          </div>
          <p>Commentaires</p>
            {tasks[index].comments.map((comment: string, index: number) => (
              <Input
                key={index}
                label="Participants"
                value={comment}
                size="lg"
                name="participants"
                id="participants"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
            ))}
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button variant="gradient" onClick={handleOpen} type="submit">
                Modifier
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
