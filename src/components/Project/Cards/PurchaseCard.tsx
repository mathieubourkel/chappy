import { Typography } from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import PurchaseModify from "../Modals/PurchaseModify";
import { intPurchase, intPurchases } from "../../../services/interfaces/intProject";
import { deletePurchaseFromBDD } from "../../../services/api/purchases";

type Props = {
  index: number;
  setPurchase: (purchase: intPurchases) => void;
  purchases: intPurchases
  isOwner: boolean
  purchase: intPurchase
};

export default function PurchaseCard({ index, setPurchase, purchases, purchase, isOwner }: Props) {
  
  console.log('PurchaseCardComposant')

  const handleDelete = () => {
    deletePurchaseFromBDD(purchase.id)
  }
  return (
      <li
        className="md:flex justify-between mb-10 items-center gap-2 border-4 
        border-b-brick-200 w-full p-2 rounded-xl bg-white border-solid"
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="p-2 text-brick-300 font-bold"
        >
          {purchase.name}
        </Typography>

        <div className='flex gap-10 justify-between'>
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            Prix : {purchase.price}€
          </p>
        </Typography>
        {isOwner && 
        <div className="flex">
          <PurchaseModify
            purchases={purchases}
            setPurchase={setPurchase}
            index={index}
          />
          <DeleteButton
            handleDeleteBDD={handleDelete}
          />
        </div>}
        </div>
        </li>
  );
}

