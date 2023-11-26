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
import { faPen, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { intTask, intTasks } from "../../../services/interfaces/intProject";

type Props = {
  tasks: intTasks;
  setTask: (task: intTasks) => void;
  index: number;
};

export default function StepModifyTask({ setTask, tasks, index }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  const [form, setForm] = useState<intTask>({ ...tasks[index] });

  useEffect(() => {
    setForm({ ...tasks[index] });
  }, [index, open, tasks]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: any) {
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
          <form onSubmit={(e: any) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                <FontAwesomeIcon icon={faSquarePlus} className="mr-3" />
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
                onChange={(e: any) => handleChange(e)}
              />
              <Textarea
                label="Description"
                value={form.description}
                size="lg"
                name="description"
                id="description"
                onChange={(e: any) => handleChange(e)}
              />
              <Textarea
                label="Catégorie"
                value={form.categorie}
                size="lg"
                name="categorie"
                id="categorie"
                onChange={(e: any) => handleChange(e)}
              />
              <div className="md: flex gap-3">
                <Input
                  label="Date de début"
                  value={form.startDate}
                  size="lg"
                  crossOrigin={undefined}
                  name="startDate"
                  id="startDate"
                  onChange={(e: any) => handleChange(e)}
                />
                <Input
                  label="Date de fin"
                  value={form.endDate}
                  size="lg"
                  crossOrigin={undefined}
                  name="endDate"
                  id="endDate"
                  onChange={(e: any) => handleChange(e)}
                />
              </div>
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
