import { useState } from "react";
import {Button,Dialog,Card,CardBody,Typography,Input,IconButton,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCode,faCopy} from "@fortawesome/free-solid-svg-icons";

export default function ProjectDisplayCode() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);

  return (
    <div>
      <Button className="flex" onClick={handleOpen}>
        <FontAwesomeIcon icon={faCode} className="mr-2" />
        <div className="hidden whitespace-nowrap md:flex">Code projet</div>
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
              Obtenir un code projet
            </Typography>
            <p>
              Qu'est ce qu'un code projet et comment l'utiliser : loremipsmu
              blalala
            </p>
            <div className="flex gap-2">
              <Input
                label="XXXX-XXXX-XXXX-XXXX"
                disabled
                size="lg"
                crossOrigin={undefined}
              />
              <IconButton>
                <FontAwesomeIcon icon={faCopy} />
              </IconButton>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}
