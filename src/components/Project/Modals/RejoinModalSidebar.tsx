/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Button, ListItem, ListItemPrefix,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./modal.css";
import { userRejoinProject } from "../../../services/api/projects.ts";

type Props = {
  setReload: (bool:boolean) => void |undefined;

};

export default function RejoinModalSidebar({setReload}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  const [code, setCode] = useState<string>("");

  const handleCode = (e: any) => {
    setCode(e.target.value);
  };

  const handleClick = async () => {

    try {
      await userRejoinProject(code);
      handleOpen()
    } catch {
      alert("Le code n'est pas valide");
    } finally {
      setReload(true)
    } 
  };

  return (
    <>
      <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"} onClick={handleOpen}>
          <ListItemPrefix>
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg" />
          </ListItemPrefix>
          Rejoindre un projet
      </ListItem>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center">
              Veuillez renseigner votre code projet
            </Typography>
            <div className="flex gap-2 mt-5">
              <Input
                label="Code à 16 caractères"
                id="code"
                name="code"
                size="lg"
                value={code}
                crossOrigin={undefined}
                onChange={(e: any) => handleCode(e)}
              />
              <Button onClick={handleClick} size={"sm"} className={"bg-brick-300"}>Rejoindre</Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
