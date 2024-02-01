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
  intStep,
} from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import Datepicker from "react-tailwindcss-datepicker";
import { useParams } from "react-router-dom";
import { addProjectStepToBDD } from "../../../services/api/steps";
import SelectStatus from "../elements/Select/SelectStatus";
import "./modal.css";
import { formatDate } from "../../../services/utils/FormatDate";

type Props = {
  setReload: (bool: boolean) => void;
};

export default function ProjectCreateStep({ setReload }: Props) {
  const date = new Date()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { idProject } = useParams();
  const [form, setForm] = useState<intStep>({
    id: undefined,
    tasks: [],
    name: "",
    description: "",
    budget: 0,
    estimEndDate: formatDate(date),
    status: 0,
    project: Number(idProject),
  });

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addProjectStepToBDD(form);
    setReload(true);
  };

  const handleDate = (value: any) => {
    setForm({ ...form, estimEndDate: value.startDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
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
                Créer un jalon
              </Typography>
              <Input
                label="Nom du jalon"
                size="lg"
                name="name"
                id="name"
                className={"border-select"}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              <Textarea
                label="Description"
                size="lg"
                name="description"
                id="description"
                className={"border-select"}
                onChange={(e: any) => handleChange(e)}
              />
              <div className="flex gap-3 flex-wrap">
                <Input
                  label="Budget"
                  size="lg"
                  crossOrigin={undefined}
                  type="number"
                  name="budget"
                  id="budget"
                  className={"border-select"}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black border-select"
                  onChange={handleDate}
                  value={{
                    startDate: form.estimEndDate,
                    endDate: form.estimEndDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée du jalon"}
                />
              </div>
              <SelectStatus handleStatus={handleStatus} />
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button
                size="sm"
                className={"bg-brick-300"}
                onClick={handleOpen}
                type="submit"
              >
                Créer
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
