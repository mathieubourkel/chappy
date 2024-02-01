/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import RejoinButton from "../elements/Buttons/OpenButton.tsx";
import "./modal.css";
import { userRejoinProject } from "../../../services/api/projects.ts";

type Props = {
  join: string;
  menu?: boolean,
  setReload: (bool:boolean) => void;
};

export default function RejoinModal({ join, menu, setReload }: Props) {
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
      {" "}
      {menu ? (
        <MenuItem className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHandHoldingHand} className={"text-sm"} />
          <Typography
            variant="small"
            className="font-medium"
            onClick={handleOpen}
          >
            {join}
          </Typography>
        </MenuItem>
      ) : (
        <RejoinButton value={"Rejoindre un projet"} onClick={handleOpen} />
      )}
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
