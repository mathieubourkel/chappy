import { useState } from "react";
import { Card, CardBody} from "@material-tailwind/react";
import { deletePurchaseFromBDD } from "../../services/api/compta";
import { intCompta, intComptas } from "../../services/interfaces/intCompta";
import ModalModifyCompta from "./ModalModifyCompta";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicIconButton from "../elements/Buttons/MagicIconButton";

type Props = {
  compta: intCompta
  comptas:intComptas
  setComptas: (comptas:intComptas) => void;
};

export default function CardCompta({compta, comptas, setComptas }: Props) {

  const [stateCompta, setStateCompta] = useState<intCompta>(compta)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleDelete = async () => {
    await deletePurchaseFromBDD(compta._id ||'');
    const updatedComptas = comptas.filter(item => item._id !== compta._id);
    setComptas(updatedComptas)
  };

  return (
    <Card className="custom-card-purchase mb-5">
      <CardBody>
        <div className="flex md:justify-between justify-center items-center flex-wrap">
          <span className="ml-3 text-brick-300 font-extrabold">
            {stateCompta.description}
          </span>
          <div className={"flex gap-2"}>
            <div className="border px-5 rounded-xl bg-light-200 m-2 text-sm text-marine-300 font-bold uppercase">
              Prix : {stateCompta.price}€
            </div>
            <div className="flex gap-2 items-center">
              <MagicIconButton type={ButtonTypeEnum.MODIFY} handleClick={handleOpen}/>
              <MagicIconButton type={ButtonTypeEnum.DELETE} handleClick={handleDelete}/>
              <ModalModifyCompta compta={stateCompta} setStateCompta={setStateCompta} open={open} handleOpen={handleOpen} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
