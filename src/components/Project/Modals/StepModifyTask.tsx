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
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  FormEvent,
  InputEvent,
  intSelect,
  intTask,
} from "../../../services/interfaces/intProject";
import Datepicker from "react-tailwindcss-datepicker";
import { modifyTaskToBDD } from "../../../services/api/tasks";
import SelectCategory from "../elements/Select/SelectCategory";
import SelectStatus from "../elements/Select/SelectStatus";
import { enumStatus } from "../../../services/interfaces/Status";

type Props = {
  task: intTask;
  categories: Array<intSelect>;
  setTask: (task: intTask) => void;
};

let count = 1;
export default function StepModifyTask({ task, categories, setTask }: Props) {
  console.log("StepModifyTask" + count++);
  const [form, setForm] = useState<intTask>(task);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDate = (value: any) => {
    setForm({ ...form, startDate: value.startDate, endDate: value.endDate });
  };

  const handleCategory = (value: any) => {
    setForm({ ...form, category: { id: value.value, name: value.label } });
  };
  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
    // setSelected(value)
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await modifyTaskToBDD(task.id, form);
    setTask(form);
  };

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
                onChange={(e: any) => handleChange(e)}
              />

              <SelectCategory
                categories={categories}
                handleCategory={handleCategory}
                defaultValue={categories[task.category.id - 1]}
              />
              <SelectStatus
                handleStatus={handleStatus}
                value={enumStatus[task.status]}
              />

              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
                  onChange={handleDate}
                  value={{ startDate: form.startDate, endDate: form.endDate }}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
              </div>
              <p>Participants</p>
              <div className="flex gap-10">
                {task.users.map((user: any, index: number) => (
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
