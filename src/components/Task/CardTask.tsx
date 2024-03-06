/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import {Button,Card,CardBody,Input,Typography,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck} from "@fortawesome/free-solid-svg-icons";
import StepDisplayTask from "./ModalDisplayTask";
import { CategoriesEnum } from "../../services/enums/categories.enum";
import { enumStatus } from "../../services/enums/status.enum";
import { intTask } from "../../services/interfaces/intTask";
import {  intUserLight } from "../../services/interfaces/intUser";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicIconButton from "../elements/Buttons/MagicIconButton";

type Props = {
  task: intTask
};

export default function CardTask({task }: Props) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <Card className={`w-full custom-card-task mb-5`}>
      <CardBody className={"min-h-[8rem] px-6 pt-4"} >
      <div className={"flex flex-wrap md:justify-between"}>
        <div className={"flex gap-x-2 items-center"}>
          <FontAwesomeIcon icon={faListCheck} size={"sm"} className={"text-marine-100"}/>
          <Typography className="custom-subt custom-sb-task">
            {CategoriesEnum[task.category].label} / {task.name}
          </Typography>
        </div>

        <div className="flex gap-x-2 w-full lg:w-fit justify-center items-center">
          <form className={"w-full lg:w-fit"}>
          <Input
            label="Status"
            disabled
            value={enumStatus[task.status].label}
            size="lg"
            name="status"
            id="status"
            className={"bg-select !border !border-marine-100/50"}
            crossOrigin={undefined}
          />
          </form>
          <div className="flex gap-x-2">
            <StepDisplayTask
              task={task}
              handleOpen={handleOpen}
              open={open}
            />
            <MagicIconButton type={ButtonTypeEnum.VIEW} handleClick={handleOpen}/>
          </div>
        </div>
      </div>

      <Typography
        variant="paragraph"
        className={
          "bg-marine-100/10 text-marine-300 rounded-lg p-2 mt-2 taskDescription"
        }
      >
        {task.description}
      </Typography>
    </CardBody>
      <div className="pr-3 py-3 flex flex-wrap gap-x-2 justify-end">
        {task.members && task.members.map((user: intUserLight) => (
            <Button className={"rounded-r-lg"}>
              {user.email}
            </Button>
          ))}
      </div>
    </Card>
  );
}
