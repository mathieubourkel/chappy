import { Button, Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleDelete: () => void;
  openD: boolean;
  handleOpenD: () => void;
};

export default function ModalDeleteProject({
  handleDelete,
  openD,
  handleOpenD,
}: Props) {
  const navigate = useNavigate();
  async function handleSubmit() {
    await handleDelete();
    navigate("/dashboard");
  }

  return (
    <Dialog
      size="sm"
      open={openD}
      handler={handleOpenD}
      className="bg-transparent shadow-none"
    >
      <Card className="custom-modal">
        <CardBody className="flex flex-col gap-4">
          <Typography
            variant="h3"
            className={"text-marine-300 text-xl font-extrabold text-center"}
          >
            Voulez-vous vraiment supprimer le projet ?
          </Typography>
          <div className="gap-5 flex justify-center">
            <Button
              size={"sm"}
              onClick={handleSubmit}
              className={"bg-brick-300"}
              type="submit"
            >
              Confirmer
            </Button>
            <Button
              size={"sm"}
              onClick={handleOpenD}
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
