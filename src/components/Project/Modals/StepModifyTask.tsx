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
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  FormEvent,
  InputEvent,
  intSelect,
  intTask
} from "../../../services/interfaces/intProject";
import Datepicker from "react-tailwindcss-datepicker";
import { modifyTaskToBDD } from "../../../services/api/tasks";
import SelectCategory from "../elements/Select/SelectCategory";
import makeAnimated from "react-select/animated";
import SelectStatus from "../elements/Select/SelectStatus";
import { enumStatus } from "../../../services/interfaces/Status";
import ReactSelect from "react-select";
const animatedComponents = makeAnimated();
import './modal.css'

type Props = {
  task: intTask;
  categories: Array<intSelect>;
  setTask: (task: intTask) => void;
  allUsers: Array<intSelect>;
};

let count = 1;
export default function StepModifyTask({ task, categories, setTask, allUsers }: Props) {
  console.log("StepModifyTask" + count++);
  const [form, setForm] = useState<intTask>(task);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  console.log(task)
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

  const handleDeleteUser = (index:number) => {
    const tempUsers = [...task.users];
    tempUsers.splice(index, 1);
    setForm({...form, users: tempUsers })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await modifyTaskToBDD(task.id, form);
    setTask(form);
  };

  const handleUsers = (value: Array<intSelect>) => {
    const tempUsers = [...task.users];
    value.forEach((element: intSelect) => {
      const userExists = tempUsers.some((tmpUser) => tmpUser.id === element.value);
      if (userExists) {
        alert("L'utilisateur est déjà présent");
      } else {
        tempUsers.push({ id: element.value, email: element.label });
      }
    });
    setForm({ ...form, users: tempUsers });
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
              <h3>Participants</h3>
              <div className="flex gap-10">
                {task.users.map((user: any, indexT: number) => (
                  <div className="flex gap-2" key={indexT}>
                    <p className="bg-white p-2 rounded-lg">{user.email}</p>
                      <IconButton onClick={() => handleDeleteUser(indexT)}>
                        <FontAwesomeIcon icon={faXmark} size="xl" />
                      </IconButton>
                  </div>
                ))}
              </div>
              <ReactSelect
                options={allUsers}
                className="rounded-xl"
                isMulti
                placeholder="Inviter des membres sur votre projet"
                components={animatedComponents}
                onChange={(value: any) => handleUsers(value)}
              />
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
