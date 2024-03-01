import { Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import { deleteMyAccount } from "../../services/api/users";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  open: boolean;
  handleOpen: () => void;
};

export default function DeleteMyAccount({open,handleOpen,}: Props) {
  const handleDeleteUser = async () => {
    await deleteMyAccount();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    window.location.reload();
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
            Voulez-vous vraiment supprimer votre compte ?
          </Typography>
          <div className="gap-5 flex justify-center">
            <MagicButton type={ButtonTypeEnum.BRICK_300} value='Confirmer' handleClick={handleDeleteUser}/>
            <MagicButton type={ButtonTypeEnum.MARINE_300} value='Annuler' handleClick={handleOpen}/>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
