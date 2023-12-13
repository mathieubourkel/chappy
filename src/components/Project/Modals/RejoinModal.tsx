import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  MenuItem,
} from "@material-tailwind/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHand
} from "@fortawesome/free-solid-svg-icons";
import RejoinButton
  from "../elements/Buttons/OpenButton.tsx";

export type Props = {
  join: string;
  menu?: boolean;
};

export default function RejoinModal({ join, menu }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);

  return (
    <> {menu ?
          <MenuItem className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHandHoldingHand} className={"text-sm"} />
        <Typography variant="small" className="font-medium" onClick={handleOpen}>
          {join}
        </Typography>
      </MenuItem>
        :
      <RejoinButton value={"Rejoindre un projet"} onClick={handleOpen}/>}
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" color="blue-gray">
              Veuillez renseigner votre code projet
            </Typography>
            <div className="flex gap-2">
              <Input
                label="XXXX-XXXX-XXXX-XXXX"
                size="lg"
                crossOrigin={undefined}
              />
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
