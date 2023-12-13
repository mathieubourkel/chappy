import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  code: string;
  open: boolean;
  handleOpen: () => void;
};

export default function ProjectDisplayCode({ code, open, handleOpen }: Props) {
  return (
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
            Ceci est un code projet, vous pouvez le partager avec une personne
            qui n'a pas encore créer son compte, elle pourra avec ce code rejoindre
            votre projet automatiquement.
          </p>
          <div className="flex gap-2">
            <Input label={code} disabled size="lg" crossOrigin={undefined} />
            <CopyToClipboard text={code}>
              <IconButton>
                <FontAwesomeIcon icon={faCopy} />
              </IconButton>
            </CopyToClipboard>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
