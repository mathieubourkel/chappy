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
import {
  FormEvent,
  InputEvent,
  intSelect,
  intTask,
  intStepNew,
} from "../../../services/interfaces/intProject";
import Datepicker from "react-tailwindcss-datepicker";
import { addTaskToStepToBDD } from "../../../services/api/tasks";
import { useParams } from "react-router-dom";
import ReactSelect from "react-select";
import * as Yup from "yup";
import makeAnimated from "react-select/animated";
import CreateButton from "../elements/Buttons/CreateButton";
import SelectCategory from "../elements/Select/SelectCategory";
import SelectStatus from "../elements/Select/SelectStatus";
import "./modal.css";
import { addNotificationToBDD } from "../../../services/api/notifications";
import { formatDate } from "../../../services/utils/FormatDate";

type Props = {
  handleReload: () => void;
  step: intStepNew;
};

export default function StepCreateTask({
  handleReload,
  step,
}: Props) {
  const { idStep, idProject } = useParams();
  const userName = localStorage.getItem("name");
  const animatedComponents = makeAnimated();
  const date = new Date()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [form, setForm] = useState<intTask>({
    name: "",
    description: "",
    category: 0,
    startDate: formatDate(date),
    endDate: formatDate(date),
    status: 0,
    users: [],
    step: step.id,
    project: step.project.id,
    budget: 0
  });

  const taskSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Pas plus de 50")
      .required("Le nom de la tâche est requis"),
    description: Yup.string()
      .max(300, "pas plus de 300")
      .required("La description de la tâche est requise"),
    status: Yup.number().required("Le statut de la tâche est requis"),
  });

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tmpIdUsers:number[] = [];
    step.project.users.map((user: any) => {
      tmpIdUsers.push(user.value);
    });
    
    const notif = {
      content: `${userName} a créé la tâche ${form.name} dans ${step.name} sur le projet ${step.project.name}`,
      receivers: tmpIdUsers,
      sendDate: date.toISOString(),
      path: `/project/${idProject}/step/${idStep}`,
      id:0,
      isView:false
    };

    taskSchema
      .validate(form)
      .then(async (validForm:any) => {
        await addTaskToStepToBDD(validForm);
        await addNotificationToBDD(notif);
        handleOpen();
        handleReload();
      })
      .catch((validationError) => {
        alert(validationError.errors);
      });
  };

  const handleUsers = (value: Array<intSelect>) => {
    const goodArray: Array<number | string | null> = [];
    value.map((element: intSelect) => (
      goodArray.push(element.value)
    ));
    setForm({ ...form, users: goodArray });
  };

  const handleDate = (value: any) => {
    setForm({ ...form, startDate: value.startDate.toString(), endDate: value.endDate.toString() });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  const handleCategory = (value: any) => {
    setForm({ ...form, category: value.value});
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
              <Typography
                variant="h3"
                className={
                  "text-marine-300 text-xl font-extrabold text-center mb-5"
                }
              >
                Créer une tâche
              </Typography>
              <Input
                label="Nom de la tâche"
                className={"bg-select focus:!b-brick-300"}
                size="lg"
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Textarea
                label="Description"
                size="lg"
                className={"bg-select"}
                name="description"
                id="description"
                onChange={(e: any) => handleChange(e)}
              />
              <Input
                label="Budget"
                size="lg"
                className={"bg-select"}
                crossOrigin={undefined}
                type="number"
                name="budget"
                id="budget"
                onChange={(e: InputEvent) => handleChange(e)}
              />

              <SelectStatus handleStatus={handleStatus} />

              <SelectCategory handleCategory={handleCategory} />

              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal border-select bg-select placeholder:text-text-100 text-sm placeholder:text-sm"
                  onChange={handleDate}
                  value={{ startDate: form.startDate, endDate: form.endDate }}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
              </div>
              <ReactSelect
                options={step.project.users}
                className="rounded-xl border-select"
                isMulti
                placeholder="Ajouter des participants à la tâche"
                components={animatedComponents}
                onChange={(value: any) => handleUsers(value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: "rgba(126,55,47, 0.2)",
                    primary: "rgba(126,55,47, 0.7)",
                    primary50: "rgba(126,55,47, 0.3)",
                  },
                  fontSize: '0.875rem',
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
