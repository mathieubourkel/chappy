import {Dialog,Card,CardBody,Typography,Input} from "@material-tailwind/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MagicIconButton from "../elements/Buttons/MagicIconButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
  
type Props = {
    code: string;
    open: boolean;
    handleOpen: () => void;
};
  
export default function ModalDisplayCode({ code, open, handleOpen }: Props) {
    return (
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center">
              Obtenir un code projet
            </Typography>
            <p>
              Ceci est un code projet, vous pouvez le partager avec une personne
              qui n'a pas encore créer son compte, elle pourra avec ce code rejoindre
              votre projet automatiquement.
            </p>
            <div className="flex gap-2">
              <Input label={code} disabled size="lg" className={"bg-select !border !border-marine-100/50"} crossOrigin={undefined} />
              <CopyToClipboard text={code}>
                <MagicIconButton type={ButtonTypeEnum.COPY}/>
              </CopyToClipboard>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    );
  }
  