/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Option,
  Select,
} from "@material-tailwind/react";
import {
  FormEvent, intProjectLight,
  intUser,
  intUserLight,
  intUsers
} from "../../../services/interfaces/intProject";
import CreateButton from "../elements/Buttons/CreateButton";
import { useParams } from "react-router-dom";
import { addUserToProjectToBDD, getAllUsers } from "../../../services/api/users";
import './modal.css'


type Props = {
  project: intProjectLight
  setProject: (project: intProjectLight) => void;
};

export default function MembersAdd({ project, setProject}: Props) {
  
  const {idProject} = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<intUsers>([])
  const [selected, setSelected] = useState<string | undefined>('')

  useEffect(() => {
    async function getUsers(){
      const result = await getAllUsers();
      result && setUsers(result)
    }
    getUsers();
  }, []);

  function handleChange(value: string | undefined) {
    setSelected(value)
  }

  const handleOpen = () => setOpen((cur) => !cur);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user:any = users.find((element:intUser) => element.email == selected)
    const tmpArrayUsers = project.users;
    tmpArrayUsers?.push(user)
    setProject({ ...project, users: tmpArrayUsers});
    addUserToProjectToBDD(idProject, user.id)
  }

  return (
    <div>
      <CreateButton handleClick={handleOpen} value="Ajouter" />
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
                Ajouter un participant
              </Typography>

              <Select
              value={selected}
              onChange={(value: any) => handleChange(value as string | undefined)}
              >
              {users.map((user: intUserLight, index: number) => (
            <Option key={index} value={user.email}>
              {user.firstname} {user.lastname}
            </Option>
          ))}
              </Select>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button onClick={handleOpen} size={"sm"} type="submit" className={"bg-brick-300"}>
                Ajouter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
