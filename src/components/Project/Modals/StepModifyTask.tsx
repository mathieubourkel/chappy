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
import { FormEvent, InputEvent, intTask, intUser } from "../../../services/interfaces/intProject";
import SelectCategory from "../Buttons/SelectCategory";

type Props = {
  task: intTask;
  setTask: (task: intTask) => void;
  index: number;
  handleOpen: () => void;
  open: boolean
};

export default function StepModifyTask({ setTask, task, index, handleOpen, open }: Props) {

  const [form, setForm] = useState<intTask>({ ...task });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTask(form);
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
              <SelectCategory task={task} isOwner={true} 
              classState="basis-1/2"/>

              <div className="sm:flex gap-3">
                {/* <SelectDate state={tasks} setState={setTask}
                /> */}
                <Input
                  label="Date de fin estimée"
                  // value={form.estimEndDate.toString()}
                  value="toto"
                  size="lg"
                  crossOrigin={undefined}
                  name="estimEndDate"
                  id="estimEndDate"
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
              {/* <div>
                <SelectDate state={/>
              </div> */}
              <p>Participants</p>
          <div className="flex gap-10">
            {task.app_users.map((user: intUser, index: number) => (
              <Input
                key={index}
                label="Participants"
                value={user.email}
                size="lg"
                disabled
                name="participants"
                id="participants"
                crossOrigin={undefined}
              />
            ))}
          </div>
          <p>Commentaires</p>
            {/* {tasks[index].comments.map((comment: string, index: number) => (
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
            ))} */}
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
