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
  return (
    <>
      <li
        className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
      >
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            {purchases[index].name}
          </p>
        </Typography>
        <Typography variant="h5" className="p-2 text-brick-300">
          Prix : {purchases[index].price}€
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
      </li>
    </>
  );
}
