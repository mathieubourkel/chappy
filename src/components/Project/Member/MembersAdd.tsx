/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {Button,Dialog,Card,CardBody,CardFooter,Typography,Option,Select,} from "@material-tailwind/react";
import CreateButton from "../elements/Buttons/CreateButton";
import { useParams } from "react-router-dom";
import { addUserToProjectToBDD, getAllUsers } from "../../../services/api/users";
import { intProject } from "../../../services/interfaces/intProject";
import { intUser, intUserLight, intUsers } from "../../../services/interfaces/intUser";
import { FormEvent } from "../../../services/interfaces/generique.interface";

type Props = {
  project: intProject
  setProject: (project: intProject) => void;
};

export default function MembersAdd({ project, setProject}: Props) {
  
  const {idProject} = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<intUsers>([])
  const [selected, setSelected] = useState<string | undefined>('')

  useEffect(() => {
    const getUsers = async () => {
    try {
      const {data} = await getAllUsers();
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
    }
    getUsers();
  }, []);

  function handleChange(value: string | undefined) {
    setSelected(value)
  }

  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user:any = users.find((element:intUser) => element.email == selected)
    const tmpArray:any = project.members
    tmpArray.push({id: user.id, email: selected})
    await addUserToProjectToBDD(idProject ||'', user.id, selected || "")
    setProject({ ...project, members: tmpArray});
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
              {users.map((user: intUserLight) => (
            <Option key={user.id} value={user.email}>
              {user.email}
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
