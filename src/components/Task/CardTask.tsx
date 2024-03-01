/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../elements/Select/SelectStatus";
import StepModifyTask from "./ModalModifyTask";
import StepDisplayTask from "./ModalDisplayTask";
import {
  deleteTaskFromBDD,
  modifyTaskToBDD,
  deleteUserToTaskToBDD,
} from "../../services/api/tasks";

import { CategoriesEnum } from "../../services/enums/categories.enum";
import { enumStatus } from "../../services/enums/status.enum";
import { intTask } from "../../services/interfaces/intTask";
import {  intUserLight } from "../../services/interfaces/intUser";
import MagicIconButton from "../elements/Buttons/MagicIconButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  handleReload: () => void;
  allUsers: []
  task: intTask
};

export default function CardTask({ handleReload, allUsers, task }: Props) {
  const userId: string = localStorage.getItem("id") || ""
  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM((bool) => !bool);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  if (!task.members ||task.members.length == 0) task.members = []
  let isOwner = false;
  if (task.owner && task.owner.id == +userId) isOwner = true


  const handleDelete = async (userId: number) => {
    await deleteUserToTaskToBDD( task._id ||'', userId || 0);
    handleReload()
  };

  const handleDeleteTask = async () => {
    await deleteTaskFromBDD(task._id ||'');
    handleReload();
  };

  const handleStatus = async (values: any) => {
    const data = { ...task, status: values.value };
    await modifyTaskToBDD(task._id ||'', data);
    handleReload()
  };

  const renderTaskOwner = () => (
    <CardBody className={"custom-card-body px-6 pt-4"}>
      <div className={"flex flex-wrap md:justify-between"}>
        <div className={"flex gap-x-2 items-center"}>
          <FontAwesomeIcon
            icon={faListCheck}
            size={"sm"}
            className={"text-marine-100"}
          />
          <Typography className="custom-subt custom-sb-task">
            {CategoriesEnum[task.category].label} / {task.name}
          </Typography>
        </div>

        <div className="flex gap-x-2 w-full lg:w-fit justify-center items-center">
          <form className={"w-full lg:w-fit"}>
            <SelectStatus
              handleStatus={handleStatus}
              value={enumStatus[task.status]}
            />
          </form>
          <div className="flex gap-x-2">
            <StepModifyTask task={task} handleReload={handleReload} allUsers={allUsers} open={open} handleOpen={handleOpen} />
            <MagicIconButton type={ButtonTypeEnum.MODIFY} handleClick={handleOpen}/>
            <MagicIconButton type={ButtonTypeEnum.DELETE} handleClick={handleDeleteTask} />
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
  );

  const renderTaskUser = () => (
    <CardBody className={"custom-card-body px-6 pt-4"}>
      <div className={"flex flex-wrap md:justify-between"}>
        <div className={"flex gap-x-2 items-center"}>
          <FontAwesomeIcon
            icon={faListCheck}
            size={"sm"}
            className={"text-marine-100"}
          />
          <Typography
            className="custom-subt custom-sb-task"
            onClick={handleOpenM}
          >
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
              handleOpenM={handleOpenM}
              openM={openM}
            />
          </div>
        </div>
      </div>

      <Typography
        variant="paragraph"
        className={
          "bg-marine-100/10 text-marine-300 rounded-lg p-2 mt-2 taskDescription"
        }
        onClick={handleOpenM}
      >
        {task.description}
      </Typography>
    </CardBody>
  );

  return (
    <Card className={`w-full custom-card-task mb-5`}>
      <div>
        {isOwner ? renderTaskOwner() : renderTaskUser()}

        <div
          className="pr-3 py-3 flex flex-wrap gap-x-2 justify-end"
          onClick={handleOpenM}
        >
          {task.members && task.members.map((user: intUserLight) => (
            <ButtonGroup
              size={"sm"}
              className={"divide-light-100/50 mb-2"}
              key={user.id}
            >
              <Button className={!isOwner ? "rounded-r-lg" : undefined}>
                {user.email}
              </Button>

              {isOwner && (
                <Button onClick={() => handleDelete(user.id ||0)}>
                  <FontAwesomeIcon icon={faXmark} size="sm" />
                </Button>
              )}
            </ButtonGroup>
          ))}
        </div>
      </div>
    </Card>
  );
}
