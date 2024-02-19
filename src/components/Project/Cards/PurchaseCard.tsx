import {
  Card, CardBody
} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import PurchaseModify from "../Modals/PurchaseModify";
import {
  intPurchase,
} from "../../../services/interfaces/intProject";
import { deletePurchaseFromBDD } from "../../../services/api/compta";

type Props = {
  purchase: intPurchase;
  handleReload: () => void;
};

export default function PurchaseCard({
  purchase,
  handleReload
}: Props) {

  const handleDelete = async () => {
    await deletePurchaseFromBDD(purchase._id);
    handleReload()
  };

  return (
    <Card
      className="custom-card-purchase mb-5"
    >
      <CardBody>
        <div
            className="flex md:justify-between justify-center items-center flex-wrap">
          <span
              className="ml-3 text-brick-300 font-extrabold"
          >
            {purchase.description}
          </span>

          <div className={"flex gap-2"}>
            <div
                className="border px-5 rounded-xl bg-light-200 m-2 text-sm text-marine-300 font-bold uppercase">
              Prix : {purchase.price.fullTaxPrice}€
            </div>
                <div
                    className="flex gap-2 items-center">
                  <PurchaseModify
                      purchase={purchase}
                      handleReload={handleReload}
                  />
                  <DeleteButton handleDeleteBDD={handleDelete}/>
                </div>
          </div>


        </div>
      </CardBody>
    </Card>
  );
}
