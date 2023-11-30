import { Typography } from "@material-tailwind/react";
import DeleteButton from "../Buttons/DeleteButton";
import PurchaseModify from "../Modals/PurchaseModify";
import { intPurchases } from "../../../services/interfaces/intProject";

type Props = {
  index: number;
  setPurchase: (purchase: intPurchases) => void;
  purchases: intPurchases
  isOwner: boolean
};

export default function PurchaseCard({ index, setPurchase, purchases, isOwner }: Props) {
  
  console.log('PurchaseCardComposant')
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
          {purchases[index].name}
        </Typography>

        <div className='flex gap-10 justify-between'>
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            Prix : {purchases[index].price}€
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
            index={index}
            state={purchases}
            setState={setPurchase}
          />
        </div>}
        </div>
        </li>
  );
}
