import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../Buttons/DeleteButton";

export default function DemandsModal() {
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
    <div>
      <Button
        className="md:mx-5 flex items-center text-brick-300 border-brick-300"
        variant="outlined"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faSquarePlus} />
        <a className="pl-2 hidden md:flex whitespace-nowrap">Mes demandes</a>
      </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" color="blue-gray">
              Vous avez {demands.length} demandes en cours
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
                    className="text-white bg-brick-300"
                    variant="outlined"
                  >
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  </IconButton>
                  <DeleteButton
                    state={demands}
                    setState={setDemand}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}
