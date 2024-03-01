import { useState } from "react";
import {Dialog,Card,CardBody,Typography,Input,IconButton} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import MagicIconButton from "../elements/Buttons/MagicIconButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
   open: boolean,
   handleOpen: () => void;
}

export default function DemandsModal({open, handleOpen}:Props) {

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
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
              Vous avez {demands.length} {demands.length > 1 ? "demandes" : "demande" }  en cours
            </Typography>
            {demands.map((demand, index: number) => (
              <div key={index} className="flex justify-between gap-5">
                <Input
                  label="Demande de participaton a un projet"
                  value={demand.owner}
                  size="lg"
                  crossOrigin={undefined}
                  disabled
                />
                <div className="flex gap-5">
                  <IconButton
                    onClick={() => handleValidate(index)}
                    className="text-white bg-brick-300 text-sm"
                    variant="outlined"
                  >
                    <FontAwesomeIcon icon={faCheck} className={"text-sm"} />
                  </IconButton>
                  <MagicIconButton type={ButtonTypeEnum.DELETE}/>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Dialog>
  );
}
