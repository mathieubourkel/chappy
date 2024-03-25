/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dialog,Card,CardBody,Typography} from "@material-tailwind/react";
import { CategoriesEnum } from "../../services/enums/categories.enum";
import { intTask } from "../../services/interfaces/intTask";
import { Status } from "../../services/enums/status.enum";
import { intUserLight } from "../../services/interfaces/intUser";
import MagicInput from "../elements/Input/MagicInput";
import MagicSelect from "../elements/Select/MagicSelect";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  task: intTask;
  handleOpen: () => void;
  open: boolean;
};

export default function ModalDisplayTask({ task, handleOpen, open }: Props) {
  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="bg-transparent shadow-none">
      <Card className="custom-modal">
        <CardBody className="flex flex-col gap-4">
          <MagicInput name="name" label="Nom de la tâche" value={task.name}/>
          <MagicInput name="description" label="Description" value={task.description}  type='text'/>
          <MagicInput name='budget' label='Budget' type='number' value={task.budget.toString()}/>
          <MagicSelect options={Status} value={Status[task.status]} label='status' placeholder='Status'/>
          <MagicSelect options={CategoriesEnum} value={CategoriesEnum[task.category]} label='category' placeholder='Catégorie'/>
          <div className="sm:flex gap-3">
            <MagicInput name="startDate" label="Date de début" value={task.startDate.toString()}/>
            <MagicInput name="endDate" label="Date de fin" value={task.endDate.toString()}/>
          </div>
          <Typography variant="h4" className={"text-marine-300 text-lg font-extrabold mt-3"}>
            Participants
          </Typography>
          <div className="flex gap-2 flex-wrap justify-center">
            {task.members && task.members.map((user: intUserLight, indexT: number) => (
              <MagicButton key={indexT} type={ButtonTypeEnum.MAIL_USER} value={user.email}/>
            ))}
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
