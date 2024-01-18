/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    Button, ButtonGroup,
    Card, CardBody,
    Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListCheck,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import SelectStatus from "../elements/Select/SelectStatus";
import StepModifyTask from "../Modals/StepModifyTask";
import StepDisplayTask from "../Modals/StepDisplayTask";
import DeleteButton from "../elements/Buttons/DeleteButton";
import { intSelect,intTask} from "../../../services/interfaces/intProject";

import {
  deleteTaskFromBDD,
  getTaskById,
  modifyTaskToBDD,
  deleteUserToTaskToBDD,
} from "../../../services/api/tasks";
import { enumStatus } from "../../../services/interfaces/Status";

type Props = {
  id: number |undefined
  handleReload: () => void;
  categories: Array<intSelect>;
  allUsers: Array<intSelect>;
};

let count = 1;
export default function TaskCard({ id, handleReload, categories, allUsers }: Props) {
 const userId: string | undefined | null = localStorage.getItem("id");
  const [openM, setOpenM] = useState(false);
  const handleOpenM = () => setOpenM((bool) => !bool);
  const [task, setTask] = useState<intTask>({
    name: "",
    status: 0,
    category: { id: 0, name: "" },
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    users: [],
    user: { id: 0 }
  });

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getTask = async () => {
      const result = await getTaskById(id);
      result.user.id == userId && setIsOwner(true);
      setTask(result);
    }
    getTask();
  }, [id, userId]);

  const handleDelete = async (indexT: number) => {
    const tempUsers = [...task.users];
    tempUsers.splice(indexT, 1);
    const tempTask = { ...task, users: tempUsers };
    await deleteUserToTaskToBDD(task.id, task.users[indexT].id);
    setTask(tempTask);
  }

  const handleDeleteTask = async () => {
    await deleteTaskFromBDD(task.id);
    handleReload();
  };

  const handleStatus = async (values: any) => {
    const data = { ...task, status: values.value };
    await modifyTaskToBDD(task.id, data);
    setTask(data)
  };

  const renderTaskOwner = () => (
      <CardBody className={"custom-card-body px-6 pt-4"}>
          <div className={"flex flex-wrap md:justify-between"}>
              <div
                  className={"flex gap-x-2 items-center"}>
                  <FontAwesomeIcon icon={faListCheck} size={"sm"} className={"text-marine-100"} />
                  <Typography
                      className="custom-subt custom-sb-task">
                      {task.category.name} / {task.name}
                  </Typography>
              </div>

              <div
                  className="flex gap-x-2 w-full lg:w-fit justify-center items-center">
                  <form className={"w-full lg:w-fit"}>
                      <SelectStatus
                          handleStatus={handleStatus}
                          value={enumStatus[task.status]}/>
                  </form>
                  <div className="flex gap-x-2">
                      <StepModifyTask task={task}
                                      categories={categories}
                                      setTask={setTask}
                                      allUsers={allUsers}/>
                      <DeleteButton
                          handleDeleteBDD={handleDeleteTask}/>
                  </div>
              </div>
          </div>
          <Typography variant="paragraph" className={"bg-marine-100/10 text-marine-300 rounded-lg p-2 mt-2 taskDescription"}>
              {task.description}
          </Typography>

      </CardBody>
  );

    const renderTaskUser = () => (

            <CardBody className={"custom-card-body px-6 pt-4"}>
                <div
                    className={"flex flex-wrap md:justify-between"}>
                    <div
                        className={"flex gap-x-2 items-center"}>
                        <FontAwesomeIcon
                            icon={faListCheck}
                            size={"sm"}
                            className={"text-marine-100"}/>
                        <Typography
                            className="custom-subt custom-sb-task"
                            onClick={handleOpenM}>
                            {task.category.name} / {task.name}
                        </Typography>
                    </div>

                    <div
                        className="flex gap-x-2 w-full lg:w-fit justify-center items-center">
                        <form
                            className={"w-full lg:w-fit"}
                            >
                            <SelectStatus
                                handleStatus={handleStatus}
                                value={enumStatus[task.status]}/>
                        </form>
                        <div
                            className="flex gap-x-2">
                            <StepDisplayTask task={task}
                                             handleOpenM={handleOpenM}
                                             openM={openM}/>
                        </div>
                    </div>
                </div>

                <Typography variant="paragraph"
                            className={"bg-marine-100/10 text-marine-300 rounded-lg p-2 mt-2 taskDescription"}
                            onClick={handleOpenM}>
                    {task.description}
                </Typography>

            </CardBody>

    );

    return (

        <Card
            className={`w-full custom-card-task mb-5`}
        >
            <div>
            {isOwner ? renderTaskOwner() :
                renderTaskUser()}

            <div className="pr-3 py-3 flex flex-wrap gap-x-2 justify-end"
                 onClick={handleOpenM}>
                {task.users.map((
                                    user: any,
                                    indexT: number
                                ) => (
                    <ButtonGroup
                        size={"sm"}
                        className={"divide-light-100/50 mb-2"}
                        key={indexT}>
                        <Button
                        className={!isOwner ? "rounded-r-lg" : undefined }>
                            {user.email}
                        </Button>

                        {isOwner && (
                            <Button
                                onClick={() => handleDelete(
                                    indexT)}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size="sm"/>
                            </Button>
                        )}
                    </ButtonGroup>
                ))}
            </div>
        </div>
        </Card>


  );
}
