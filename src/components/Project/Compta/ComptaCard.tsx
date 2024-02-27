import { useState } from "react";
import {Card, CardBody} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import PurchaseModify from "./ComptaModify";
import { deletePurchaseFromBDD } from "../../../services/api/compta";
import { intCompta, intComptas } from "../../../services/interfaces/intCompta";

type Props = {
  compta: intCompta
  comptas:intComptas
  setComptas: (comptas:intComptas) => void;
};

export default function ComptaCard({compta, comptas, setComptas }: Props) {

  const [stateCompta, setStateCompta] = useState<intCompta>(compta)

  const handleDelete = async () => {
    await deletePurchaseFromBDD(compta._id ||'');
    setComptas([...comptas])
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
              Prix : {stateCompta.price.fullTaxPrice}€
            </div>
            <div className="flex gap-2 items-center">
              <PurchaseModify compta={stateCompta} setStateCompta={setStateCompta} />
              <DeleteButton handleDeleteBDD={handleDelete}/>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
