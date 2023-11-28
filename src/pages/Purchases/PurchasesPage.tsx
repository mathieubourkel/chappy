import { useState } from "react";

import {  Typography } from "@material-tailwind/react";
import {
  intPurchases,
  intProject,
  intPurchase,
} from "../../services/interfaces/intProject";
import PurchaseCard from "../../components/Project/Cards/PurchaseCard";
import PurchaseAdd from "../../components/Project/Modals/PurchaseAdd";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";


type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function MembersPage({ project, isOwner }: Props) {
  const [purchases, setPurchase] = useState<intPurchases>([
    { name: "Carrelage", price: 40 },
    { name: "Prises", price: 400 },
    { name: "Placo", price: 4000 },
    { name: "Main d'oeuvre", price: 32 },
  ]);

  const calcul = () => {
    let total: number = 0;
    purchases.map((purchase) => {
      total += Math.floor(purchase.price);
    });
    return total;
  };

  return (
    <main className="project-page sm:mx-20 mx-5 mb-20">
      <ProjectHeader project={project} />
      <section className="b2-header flex justify-between mt-20">
        <div>
          <h2>Mes achats</h2>
        </div>
        {isOwner && (
          <div className="b2-header-buttons flex">
            <PurchaseAdd purchases={purchases} setPurchase={setPurchase} />
          </div>
        )}
      </section>
      <ul className="mt-5">
        {purchases.map((_purchase: intPurchase, index: number) => (
          <PurchaseCard
            key={index}
            setPurchase={setPurchase}
            purchases={purchases}
            index={index}
            isOwner={isOwner}
          />
        ))}
        <li className="flex gap-5 items-center mb-10 justify-end gap-2 mr-20">
          <div className="flex border-4 border-b-brick-200 mr-5 p-2 rounded-xl bg-white border-solid">
            <Typography variant="h5" className="flex">
              <p className="p-2 rounded-xl font-bold">TOTAL</p>
            </Typography>
            <Typography
              variant="h5"
              className="border p-2 rounded-xl text-brick-300 bg-brick-200"
            >
              {calcul()} €
            </Typography>
          </div>
        </li>
      </ul>
    </main>
  );
}