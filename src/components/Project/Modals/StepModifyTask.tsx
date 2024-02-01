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
  IconButton, ButtonGroup,
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

export default function StepModifyTask({ task, categories, setTask, allUsers }: Props) {
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
    setForm({ ...form, category: value.value});
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
    const tempUsers:any = [...task.users];
    value.forEach((element: intSelect) => {
      const userExists = tempUsers.some((tmpUser:any) => tmpUser.id === element.value);
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
        size={"sm"}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPen}
        size={"sm"}/>
      </IconButton>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Modifier la tâche
              </Typography>
              <Input
                label="Nom de la tâche"
                type="text"
                value={form.name}
                className={"bg-select focus:!b-brick-300"}
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
                className={"bg-select"}
                name="description"
                id="description"
                onChange={(e: any) => handleChange(e)}
              />

              <SelectStatus
                  handleStatus={handleStatus}
                  value={enumStatus[task.status]}
              />

              <SelectCategory
                categories={categories}
                handleCategory={handleCategory}
              />

              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal border-select bg-select placeholder:text-text-100 text-sm placeholder:text-sm"
                  onChange={handleDate}
                  value={{ startDate: form.startDate, endDate: form.endDate }}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
              </div>
              <Typography variant="h4" className={"text-marine-300 text-lg font-extrabold mt-3"}>
                Participants
              </Typography>

              <div className={"flex gap-2 justify-center flex-wrap"}>
                {task.users.map((user: any, indexT: number) => (
                    <div key={indexT}>
                    <ButtonGroup
                        size={"sm"}
                        className={"divide-light-100/50 mb-2"}
                        key={indexT}>
                      <Button>
                        {user.email}
                      </Button>
                       <Button onClick={() => handleDeleteUser(indexT)}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                size="sm"/>
                       </Button>
                    </ButtonGroup>
                  </div>
                ))}
            </div>
              <ReactSelect
                options={allUsers}
                className="rounded-xl border-select"
                isMulti
                placeholder="Inviter des membres sur votre projet"
                components={animatedComponents}
                onChange={(value: any) => handleUsers(value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(126,55,47, 0.2)',
                    primary:'rgba(126,55,47, 0.7)',
                    primary50: 'rgba(126,55,47, 0.3)',
                  },
                  fontSize: '0.875rem',
                })}
              />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button size={"sm"} className={"bg-brick-300"} onClick={handleOpen} type="submit">
                Modifier
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
