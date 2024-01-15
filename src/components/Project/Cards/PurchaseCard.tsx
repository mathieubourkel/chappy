import {
  Card, CardBody
} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import PurchaseModify from "../Modals/PurchaseModify";
import {
  intPurchase,
  intPurchases,
} from "../../../services/interfaces/intProject";
import { deletePurchaseFromBDD } from "../../../services/api/purchases";

type Props = {
  index: number;
  setPurchase: (purchase: intPurchases) => void;
  purchases: intPurchases;
  isOwner: boolean;
  purchase: intPurchase;
};

export default function PurchaseCard({
  index,
  setPurchase,
  purchases,
  purchase,
  isOwner,
}: Props) {
  console.log("PurchaseCardComposant");

  const handleDelete = () => {
    deletePurchaseFromBDD(purchase.id);
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
            {purchase.name}
          </span>

          <div className={"flex gap-2"}>
            <div
                className="border px-5 rounded-xl bg-light-200 m-2 text-sm text-marine-300 font-bold uppercase">
              Prix : {purchase.price}€
            </div>
            {isOwner && (
                <div
                    className="flex gap-2 items-center">
                  <PurchaseModify
                      purchases={purchases}
                      setPurchase={setPurchase}
                      index={index}
                  />
                  <DeleteButton
                      handleDeleteBDD={handleDelete}/>
                </div>
            )}
          </div>


        </div>
      </CardBody>
    </Card>
  );
}
