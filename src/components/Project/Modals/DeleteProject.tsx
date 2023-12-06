import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type Props = {
  handleDelete: () => void;
};

export default function DeleteProject({ handleDelete }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const navigate = useNavigate();
  async function handleSubmit() {
    await handleDelete();
    navigate("/dashboard");
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <FontAwesomeIcon icon={faXmark} size="xl" />
        <a className="ml-5">Supprimer le projet</a>
      </Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h2" color="blue-gray">
                Voulez vous vraiment supprimer le projet ?
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Button variant="gradient" onClick={handleSubmit} type="submit">
                Confirmer
              </Button>
              <Button variant="gradient" onClick={handleOpen} type="submit">
                Annuler
              </Button>
            </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}
