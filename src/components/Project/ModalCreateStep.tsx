/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Dialog,Card,CardBody,CardFooter,Typography,Input,Textarea,} from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useParams } from "react-router-dom";
import SelectStatus from "../elements/Select/SelectStatus";
import { intProject } from "../../services/interfaces/intProject";
import { intCreateStep } from "../../services/interfaces/intStep";
import { formatDate } from "../../services/utils/FormatDate";
import { addProjectStepToBDD } from "../../services/api/steps";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";


type Props = {
  setProject: (project:intProject) => void;
  project: intProject
  reloadFilteredData: (newData:any[]) => void;
  open:boolean;
  handleOpen: () => void;
};

export default function ModalCreateStep({ setProject, project, reloadFilteredData, open ,handleOpen }: Props) {
  const date = new Date()
  const { idProject } = useParams();
  const [form, setForm] = useState<intCreateStep>({
    _id: undefined,
    tasks: [],
    name: "",
    description: "",
    budget: 0,
    estimEndDate: formatDate(date),
    status: 0,
    project: idProject || "",
  });

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newStep = await addProjectStepToBDD(form);
    const newStepsArray = [newStep.data, ...project.steps]
    setProject({...project, steps: newStepsArray})
    reloadFilteredData(newStepsArray)
    handleOpen()
  };

  const handleDate = (value: any) => {
    setForm({ ...form, estimEndDate: value.startDate });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  return (
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
              <MagicButton type={ButtonTypeEnum.CREATE}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
