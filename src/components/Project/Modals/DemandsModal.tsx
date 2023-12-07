import { useState } from "react";
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
    IconButton, MenuItem
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck, faEnvelopesBulk,
} from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../elements/Buttons/DeleteButton";

type Props = {
    request: string,
}

export default function DemandsModal({request}:Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);

  const [demands, setDemand] = useState([
    { name: "demande1", isPending: true, owner: "Paul" },
    { name: "demande2", isPending: true, owner: "Pierre" },
    { name: "demande3", isPending: true, owner: "Pierre" },
    { name: "demande4", isPending: true, owner: "Jack" },
  ]);

  function handleValidate(index: number) {
    const tempTasks = [...demands];
    tempTasks.splice(index, 1);
    setDemand(tempTasks);
  }

  return (
    <>
        <MenuItem className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelopesBulk} className={"text-sm"} />

            <Typography variant="small" className="font-medium" onClick={handleOpen}>
                {request}
            </Typography>
        </MenuItem>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="custom-modal flex flex-col gap-4">
            <Typography variant="h2" className={"text-marine-300"}>
              Vous avez {demands.length} {demands.length > 1 ? "demandes" : "demande" }  en cours
            </Typography>
            {demands.map((demand, index: number) => (
              <div key={index} className="flex justify-between gap-5">
                <Input
                  label="Demande de participaton a un projet"
                  value={demand.owner}
                  size="lg"
                  crossOrigin={undefined}
                />
                <div className="flex gap-5">
                  <IconButton
                    onClick={() => handleValidate(index)}
                    className="text-white bg-brick-300 text-sm"
                    variant="outlined"
                  >
                    <FontAwesomeIcon icon={faCheck} className={"text-sm"} />
                  </IconButton>
                  <DeleteButton/>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
