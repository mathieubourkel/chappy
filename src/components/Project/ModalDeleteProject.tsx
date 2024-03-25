import { Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import MagicButton from "../elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

type Props = {
  handleDelete: () => void;
  openD: boolean;
  handleOpenD: () => void;
};

export default function ModalDeleteProject({handleDelete,openD,handleOpenD}: Props) {
  const navigate = useNavigate();
  function handleSubmit() {
    handleDelete();
    navigate("/dashboard");
  }

  return (
    <Dialog size="sm" open={openD} handler={handleOpenD} className="bg-transparent shadow-none">
      <Card className="custom-modal">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center"}>
            Voulez-vous vraiment supprimer le projet ?
          </Typography>
          <div className="gap-5 flex justify-center">
            <MagicButton type={ButtonTypeEnum.BRICK_300} value='Confirmer' handleClick={handleSubmit}/>
            <MagicButton type={ButtonTypeEnum.MARINE_300} value='Annuler' handleClick={handleOpenD}/>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
