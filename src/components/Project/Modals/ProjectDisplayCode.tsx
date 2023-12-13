import { useState } from "react";
import {Button,Dialog,Card,CardBody,Typography,Input,IconButton,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCode,faCopy} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard"

type Props = {
  code: string
}

export default function ProjectDisplayCode({code}:Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  
  return (
    <div>
      <Button size={"sm"} className="flex" onClick={handleOpen}>
        <FontAwesomeIcon icon={faCode} className="lg:mr-2" />
        <span className="hidden whitespace-nowrap lg:flex">Code projet</span>
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
                label={code}
                disabled
                size="lg"
                crossOrigin={undefined}
              />
              <CopyToClipboard text={code}>
              <IconButton>
                <FontAwesomeIcon icon={faCopy} />
              </IconButton>
              </CopyToClipboard>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}
