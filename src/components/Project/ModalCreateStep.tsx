/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,CardFooter,Typography,Input,Textarea,} from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useParams } from "react-router-dom";
import { intProject } from "../../services/interfaces/intProject"
import { addProjectStepToBDD } from "../../services/api/steps";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import ReactSelect from "react-select";
import { Status } from "../../services/enums/status.enum";
import makeAnimated from "react-select/animated";
import { StepSchema } from "../../services/schemas/step.schema";
import { useMagicForm } from "../../hooks/useMagicForm";

type Props = {
  setProject: (project:intProject) => void;
  project: intProject
  reloadFilteredData: (newData:any[]) => void;
  open:boolean;
  handleOpen: () => void;
};
const animatedComponents = makeAnimated();
export default function ModalCreateStep({ setProject, project, reloadFilteredData, open ,handleOpen }: Props) {

  const { idProject } = useParams();
  const {form, handleChange, handleSelect, handleDate, validateForm, renderErrors} = useMagicForm()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(StepSchema)) return;
    const newStep = await addProjectStepToBDD({...form, project: idProject ||''});
    const newStepsArray = [newStep.data, ...project.steps]
    setProject({...project, steps: newStepsArray})
    reloadFilteredData(newStepsArray)
    handleOpen()
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
              {renderErrors('name')}
              
              <Textarea
                label="Description"
                size="lg"
                name="description"
                id="description"
                className={"border-select"}
                onChange={(e: any) => handleChange(e)}
              />
              {renderErrors('description')}
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
                {renderErrors('budget')}
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black border-select"
                  onChange={(value:any) => handleDate(value, 'estimEndDate')}
                  value={{
                    startDate: form.estimEndDate,
                    endDate: form.estimEndDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la durée du jalon"}
                />
                {renderErrors('estimEndDate')}
              </div>
              <ReactSelect
                  options={Status}
                  className="rounded-xl border-select"
                  placeholder="Status"
                  defaultValue={Status[0].label}
                  components={animatedComponents}
                  onChange={(value: any) => handleSelect(value, 'status')}
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
                {renderErrors('status')}
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <MagicButton type={ButtonTypeEnum.CREATE}/>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
  );
}
