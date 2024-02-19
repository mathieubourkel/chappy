/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import StepModifyTask from "../Modals/StepModifyTask";
import StepDisplayTask from "../Modals/StepDisplayTask";
import DeleteButton from "../elements/Buttons/DeleteButton";
import {
  intSelect,
  intTaskRelou,
} from "../../../services/interfaces/intProject";

import {
  deleteTaskFromBDD,
  getTaskById,
  modifyTaskToBDD,
  deleteUserToTaskToBDD,
} from "../../../services/api/tasks";
import { enumStatus } from "../../../services/interfaces/Status";
import { CategoriesEnum } from "../../../services/enums/categories.enum";

type Props = {
  id: number | undefined;
  handleReload: () => void;
  allUsers: Array<intSelect>;
  task: intTaskRelou
};

export default function TaskCard({ id, handleReload, allUsers, task }: Props) {
  const userId: string | undefined | null = localStorage.getItem("id") || ""
  const [openM, setOpenM] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false)
  const handleReloadTask = () => setReload((bool) => !bool);
  const handleOpenM = () => setOpenM((bool) => !bool);

  let isOwner = false;
  if (task.owner == userId || task.members.find((member:{id: number}) => member.id == +userId)) isOwner = true;


  const handleDelete = async (indexT: number) => {
    const tempUsers = [...task.members];
    tempUsers.splice(indexT, 1);
    const tempTask = { ...task, members: tempUsers };
    await deleteUserToTaskToBDD(task.members[indexT].id, task._id);
    setTask(tempTask);
  };

  const handleDeleteTask = async () => {
    await deleteTaskFromBDD(task._id);
    handleReload();
  };

  const handleStatus = async (values: any) => {
    const data = { ...task, status: values.value };
    await modifyTaskToBDD(task._id, data);
    setTask(data);
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
            <StepModifyTask task={task} handleReload={handleReloadTask} allUsers={allUsers} />
            <DeleteButton handleDeleteBDD={handleDeleteTask} />
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
    if (error) return (<div>Error Fetching this Task</div>)
  return (
    <Card className={`w-full custom-card-task mb-5`}>
      <div>
        {isOwner ? renderTaskOwner() : renderTaskUser()}

        <div
          className="pr-3 py-3 flex flex-wrap gap-x-2 justify-end"
          onClick={handleOpenM}
        >
          {task.members.map((user: any, indexT: number) => (
            <ButtonGroup
              size={"sm"}
              className={"divide-light-100/50 mb-2"}
              key={indexT}
            >
              <Button className={!isOwner ? "rounded-r-lg" : undefined}>
                {user.email}
              </Button>

              {isOwner && (
                <Button onClick={() => handleDelete(indexT)}>
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
