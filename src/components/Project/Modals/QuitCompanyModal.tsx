import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import "./modal.css";
import { quitCompany } from "../../../services/api/users";
import { colors } from "@material-tailwind/react/types/generic";

type Props = {
  open: boolean
  handleOpen: () => void;
  handleReload: () => void;
  newAlert: (message: string, color: colors) => void;
  idDemand: number
};

export default function QuitCompanyModal({idDemand, handleReload, open, handleOpen, newAlert}: Props) {

  const handleClick = async () => {
      await quitCompany(idDemand);
      newAlert("Vous avez quitté une entreprise.", 'green')
      handleReload()
      handleOpen()
  };
 
  return (
    <Dialog
    size="sm"
    open={open}
    handler={handleOpen}
    className="bg-transparent shadow-none"
  >
    <Card className="custom-modal">
      <CardBody className="flex flex-col gap-4">
        <Typography
          variant="h3"
          className={"text-marine-300 text-xl font-extrabold text-center"}
        >
          Voulez-vous vraiment quitter votre entreprise ?
        </Typography>
        <div className="gap-5 flex justify-center">
          <Button
            size={"sm"}
            onClick={() => handleClick()}
            className={"bg-brick-300"}
          >
            Confirmer
          </Button>
          <Button
            size={"sm"}
            onClick={handleOpen}
            className={"border-marine-300"}
            type='submit'
          >
            Annuler
          </Button>
        </div>
      </CardBody>
    </Card>
  </Dialog>
  );
}