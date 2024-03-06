/* eslint-disable @typescript-eslint/no-explicit-any */
import { faListCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, Card, CardBody, Typography } from '@material-tailwind/react'
import MagicIconButton from '../elements/Buttons/MagicIconButton'
import { ButtonTypeEnum } from '../../services/enums/button.type'
import { CategoriesEnum } from '../../services/enums/categories.enum'
import { intTask } from '../../services/interfaces/intTask'
import StepModifyTask from "./ModalModifyTask";
import { intUserLight } from '../../services/interfaces/intUser'
import SelectStatus from '../elements/Select/SelectStatus'
import { enumStatus } from '../../services/enums/status.enum'
import { useState } from 'react'
import { deleteTaskFromBDD, deleteUserToTaskToBDD, modifyTaskToBDD } from '../../services/api/tasks'

type Props = {
    allUsers: []
    task: intTask
    handleUpdateSteps: (id:string) => void;
  };

export default function CardTaskOwner({ allUsers, task, handleUpdateSteps }: Props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [oneTask, setOneTask] = useState<intTask>(task)
    const handleStatus = async (values: any) => {
        const data = { ...task, status: values.value };
        const newTask = await modifyTaskToBDD(task._id ||'', data);
        setOneTask(newTask.data)
      };

    const handleDeleteTask = async () => {
        await deleteTaskFromBDD(task._id ||'');
        handleUpdateSteps(task._id ||'');
    };

    const handleDelete = async (userId: number) => {
        await deleteUserToTaskToBDD( task._id ||'', userId || 0);
        const updatedMembers = oneTask.members?.filter(item => item.id !== userId);
        setOneTask({...task, members: updatedMembers})
    };
  
    return (
        <Card className={`w-full custom-card-task mb-5`}>
        <CardBody className={"min-h-[8rem] px-6 pt-4"}>
            <div className={"flex flex-wrap md:justify-between"}>
                <div className={"flex gap-x-2 items-center"}>
                <FontAwesomeIcon icon={faListCheck} size={"sm"} className={"text-marine-100"}/>
                <Typography className="custom-subt custom-sb-task">
                    {CategoriesEnum[oneTask.category].label} / {oneTask.name}
                </Typography>
                </div>

                <div className="flex gap-x-2 w-full lg:w-fit justify-center items-center">
                <form className={"w-full lg:w-fit"}>
                    <SelectStatus
                    handleStatus={handleStatus}
                    value={enumStatus[oneTask.status]}
                    />
                </form>
                <StepModifyTask task={oneTask} setTask={setOneTask} allUsers={allUsers} open={open} handleOpen={handleOpen} />
                <div className="flex gap-x-2">
                    <MagicIconButton type={ButtonTypeEnum.MODIFY} handleClick={handleOpen}/>
                    <MagicIconButton type={ButtonTypeEnum.DELETE} handleClick={handleDeleteTask} />
                </div>
                </div>
            </div>
            <Typography variant="paragraph" className={"bg-marine-100/10 text-marine-300 rounded-lg p-2 mt-2 taskDescription"}>
                {oneTask.description}
            </Typography>
        </CardBody>
        <div className="pr-3 py-3 flex flex-wrap gap-x-2 justify-end">
            {oneTask.members && oneTask.members.map((user: intUserLight) => (
                <ButtonGroup size={"sm"} className={"divide-light-100/50 mb-2"} key={user.id}>
                    <Button>{user.email}</Button>
                    <Button onClick={() => handleDelete(user.id ||0)}>
                        <FontAwesomeIcon icon={faXmark} size="sm" />
                    </Button>
                </ButtonGroup>
            ))}
        </div>
        
        </Card>
  )
}
