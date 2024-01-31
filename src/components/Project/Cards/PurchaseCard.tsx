import {
  Card, CardBody
} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import PurchaseModify from "../Modals/PurchaseModify";
import {
  intProjectForPurchases,
  intPurchase,
} from "../../../services/interfaces/intProject";
import { deletePurchaseFromBDD } from "../../../services/api/purchases";

type Props = {
  index: number;
  setProject: (project: intProjectForPurchases) => void;
  project: intProjectForPurchases;
  isOwner: boolean;
  purchase: intPurchase;
  handleReload: () => void;
};

export default function PurchaseCard({
  index,
  setProject,
  project,
  purchase,
  isOwner,
  handleReload
}: Props) {

  const handleDelete = async () => {
    await deletePurchaseFromBDD(purchase.id);
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
                      project={project}
                      setProject={setProject}
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
