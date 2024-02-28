import { Button, Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import { deleteMyAccount } from "../../../services/api/users";

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
            <Button
              size={"sm"}
              onClick={handleDeleteUser}
              className={"bg-brick-300"}
              type="submit"
            >
              Confirmer
            </Button>
            <Button
              size={"sm"}
              onClick={handleOpen}
              className={"border-marine-300"}
              type="submit"
            >
              Annuler
            </Button>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
