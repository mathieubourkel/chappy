import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import RejoinButton from "../elements/Buttons/RejoinButton";

export type Props = {
  value: string;
};

export default function RejoinModal({ value }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);

  return (
    <div>
      <RejoinButton value={value} onClick={handleOpen} />
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
    </div>
  );
}
