import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, InputEvent, intMember, intMembers } from "../../../services/interfaces/intProject";

type Props = {
  members: intMembers
  setMember: (members: intMembers) => void;
};

export default function MembersAdd({ members, setMember}: Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [form, setForm] = useState<intMember>({
    name: "", company:"", tasks:0
  });

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMember([...members, form]);
  }

  return (
    <div>
      <Button
        className="mr-5 bg-brick-300 flex items-center"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faSquarePlus} />
        <a className="pl-2 hidden md:flex">Ajouter</a>
      </Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                <FontAwesomeIcon icon={faSquarePlus} className="mr-3" />
                Ajouter un participant
              </Typography>
              <Input
                label="Nom du participant"
                size="lg"
                name="name"
                id="name"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
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
