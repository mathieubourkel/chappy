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
} from "@material-tailwind/react";
import {
  FormEvent,
  InputEvent,
  intUser,
  intSelect,
  intTask,
  intUsersLight,
  intStep,
} from "../../../services/interfaces/intProject";
import Datepicker from "react-tailwindcss-datepicker";
import { addTaskToStepToBDD } from "../../../services/api/tasks";
import { useParams } from "react-router-dom";
import { getMembersByProject } from "../../../services/api/users";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import CreateButton from "../elements/Buttons/CreateButton";
import SelectCategory from "../elements/Select/SelectCategory";
import SelectStatus from "../elements/Select/SelectStatus";
import './modal.css'
import { addNotificationToBDD } from "../../../services/api/notifications";

type Props = {
  handleReload: () => void;
  categories: Array<intSelect>
  step:intStep
};

let count = 1;
export default function StepCreateTask({ handleReload, categories ,step }: Props) {
  console.log("StepCreateTaskComponent" + count++);
  const { idStep, idProject } = useParams();
  const userId = localStorage.getItem("id");
  const animatedComponents = makeAnimated();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [users, setUsers] = useState<Array<intSelect>>([]);

  const [form, setForm] = useState<intTask>({
    name: "",
    description: "",
    category: { id: 1, name: "" },
    startDate: new Date(),
    endDate: new Date(),
    status: 0,
    users: [],
    user: { id: userId },
    project_step: { id: idStep }
  });

  useEffect(() => {
    async function getUsers() {
      const dataUsers = await getMembersByProject(idProject);
      // Reformatage pour le React Select {value: , label: }
      const dataUsersReformat: Array<intSelect> = [];
      dataUsers.users.map((element: intUser) => {
        dataUsersReformat.push({ label: element.email, value: element.id });
      });
      setUsers(dataUsersReformat);
    }
    getUsers();
  }, [idProject]);

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tmpIdUsers:any = [];
    users.map((user:any) => {tmpIdUsers.push(user.value)})
    const notif = {
      content:`a créé la tâche ${form.name} dans ${step.name} sur le projet ${step.project.name}`, 
      sender:Number(userId), 
      receivers:tmpIdUsers, timestamp: Date.now(), 
      path:`/project/${idProject}/step/${idStep}`
    }
    console.log(form)
    await addTaskToStepToBDD(form);
    await addNotificationToBDD(notif)
    handleOpen();
    handleReload();
  };

  const handleUsers = (value: Array<intSelect>) => {
    const goodArray: intUsersLight = value.map((element: intSelect) => ({ id: element.value }));
    setForm({ ...form, users: goodArray });
  };

  const handleDate = (value: any) => {
    setForm({ ...form, startDate: value.startDate, endDate: value.endDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  const handleCategory = (value: any) => {
    setForm({ ...form, category: { id: value.value, name: value.label } });
  };

  return (
    <div>
      <CreateButton handleClick={handleOpen} value="Créer" />
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
              <Input
                label="Budget"
                size="lg"
                crossOrigin={undefined}
                type="number"
                name="budget"
                id="budget"
                onChange={(e: InputEvent) => handleChange(e)}
              />

              <SelectStatus handleStatus={handleStatus} />

              <SelectCategory
                categories={categories}
                handleCategory={handleCategory}
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
              <ReactSelect
                options={users}
                className="rounded-xl"
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
                })}
              />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button size={"sm"} type="submit" className={"bg-brick-300"}>
                Créer
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
