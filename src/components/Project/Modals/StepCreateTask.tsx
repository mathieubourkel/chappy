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
  Select,
  Option
} from "@material-tailwind/react";
import {
  FormEvent,
  InputEvent,
  intCategories,
  intCategory,
  intMember,
  intTask,
} from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import Datepicker from "react-tailwindcss-datepicker";
import { Status2 } from "../../../services/interfaces/Status";
import { addTaskToStepToBDD } from "../../../services/api/tasks";
import { useParams } from "react-router-dom";
import { getMembersByProject } from "../../../services/api/users";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { getCategories } from "../../../services/api/category";

type Props = {
  handleReload:any
};
type intSelect = {
  value: number;
  label: string;
};

export default function StepCreateTask({ handleReload }: Props) {
  const {idStep, idProject} = useParams()
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem('id')
  const animatedComponents = makeAnimated();
  const handleOpen = () => setOpen((cur) => !cur);
  let tmpStatus: number = 0;
  let tmpCat: number = 1;
  const tmpDates: any = {startDate: new Date(), endDate: new Date()}
  const [usersState, setUsers] = useState<Array<intSelect>>([]);
  const [categories, setCategorie] = useState<intCategories>([]);
  const [form, setForm] = useState<intTask>({
    name: "",
    description: "",
    category: { id: 1, name:undefined },
    startDate: new Date(),
    endDate: new Date(),
    status: 0,
    // comments: [],
    users: [{id:undefined}],
    user: {id: userId},
    project_step: {id:idStep}
  });

  useEffect(() => {
    async function getUsers() {
      const result = await getMembersByProject(idProject);
      console.log(result)
      const cats = await getCategories();
      const emailArray: Array<intSelect> = [];
      result.map((element: intMember) => {
        emailArray.push({ label: element.email, value: element.id });
      });
      setUsers(emailArray);
      setCategorie(cats)
    }
    getUsers();
  }, []);

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await addTaskToStepToBDD(form)
    handleReload()
  }

  function handleUsers(value: Array<intSelect>) {
    const goodArray: Array<{ id: number }> = [];
    value.map((element: intSelect) => {
      goodArray.push({ id: element.value });
    });
    setForm({ ...form, users: goodArray });
  }

  const handleDate = (value: any) => {
    setForm({ ...form, startDate: value.startDate, endDate: value.endDate });
    tmpDates.startDate = value.startDate
    tmpDates.endDate = value.endDate
  };

  function handleStatus(value: number) {
    tmpStatus = value;
    setForm({ ...form, status: value });
  }

  function handleCategorie(value: number) {
    tmpCat = value;
    setForm({ ...form, category: {id:value, name: categories[value - 1].name} });
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
              <Input
                  label="Budget"
                  size="lg"
                  crossOrigin={undefined}
                  type="number"
                  name="budget"
                  id="budget"
                  onChange={(e: InputEvent) => handleChange(e)}
                />

              <Select
                className={"bg-light-100"}
                name="status"
                id="status"
                value={tmpStatus.toString()}
                label="Status"
                onChange={(value: any) => handleStatus(value)}
              >
                {Status2.map(
                  (i: { id: number; name: string }, index: number) => (
                    <Option key={index} value={i.id.toString()}>
                      {i.name}
                    </Option>
                  )
                )}
              </Select>
              <Select
                className={"bg-light-100"}
                name="category"
                id="category"
                value={tmpCat.toString()}
                label="Catégorie"
                onChange={(value: any) => handleCategorie(value)}
              >
                {categories.map(
                  (i: intCategory, index: number) => (
                    <Option key={index} value={i.id.toString()}>
                      {i.name}
                    </Option>
                  )
                )}
              </Select>
              <div className="sm:flex gap-3">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
                  onChange={handleDate}
                  value={tmpDates}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée de la tâche"}
                />
              </div>
              <ReactSelect
                options={usersState}
                className="rounded-xl"
                isMulti
                placeholder="Inviter des membres sur votre projet"
                components={animatedComponents}
                onChange={(value: any) => handleUsers(value)}
              />
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
