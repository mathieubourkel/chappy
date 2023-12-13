import { useState } from "react";
import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
    IconButton,
    MenuItem,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCode,faCopy} from "@fortawesome/free-solid-svg-icons";
import './modal.css'
import { CopyToClipboard } from "react-copy-to-clipboard"

type Props = {
  code: string
}

export default function ProjectDisplayCode({code}:Props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  
  return (
    <>
      <MenuItem className={"flex items-center gap-2"}>
          <FontAwesomeIcon icon={faCode} className="text-sm" />
          <Typography variant={"small"} className="font-medium" onClick={handleOpen}>
              Code projet
          </Typography>
      </MenuItem>

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
    </>
  );
}
