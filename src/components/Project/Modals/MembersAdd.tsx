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
import { FormEvent, intMember, intMembers } from "../../../services/interfaces/intProject";
import CreateButton from "../Buttons/CreateButton";
import { useParams } from "react-router-dom";
import { addUserToProjectToBDD, getAllUsers } from "../../../services/api/users";


type Props = {
  members: intMembers
  setMember: (members: intMembers) => void;
};

export default function MembersAdd({ members, setMember}: Props) {
  
  const {idProject} = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<intMembers>([])
  const [selected, setSelected] = useState<string | undefined>('')

  useEffect(() => {
    async function getUsers(){
      const result = await getAllUsers()
      setUsers(result)
    }
    getUsers();
  }, []);

  function handleChange(value: string | undefined) {
    setSelected(value)
  }

  const handleOpen = () => setOpen((cur) => !cur);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user:any = users.find((element:intMember) => element.email == selected)
    setMember([...members, user]);
    console.log(users)
    addUserToProjectToBDD(idProject, user.id)
  }

  return (
    <div>
      <CreateButton handleClick={handleOpen} value="Ajouter" />
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" color="blue-gray">
                Ajouter un participant
              </Typography>
              <Select
              value={selected}
              onChange={(value: string | undefined) => handleChange(value)}
              >
              {users.map((i: intMember, index: number) => (
            <Option key={index} value={i.email}>
              {i.email}
            </Option>
          ))}
              </Select>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button variant="gradient" onClick={handleOpen} type="submit">
                Ajouter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
