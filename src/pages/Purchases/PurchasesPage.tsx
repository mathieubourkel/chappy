import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { intPurchases, intProject, intPurchase } from "../../services/interfaces/intProject";
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
    <main className="project-page sm:mx-20 mx-5">
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
        <li
          className="flex justify-between gap-5 mt-10
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
        >
          <Typography variant="h5" color="blue-gray" className="flex">
            <p className="border p-2 rounded-xl bg-light-200">TOTAL ACHATS</p>
          </Typography>
          <Typography variant="h5" className="p-2 text-brick-300">
            Total : {calcul()} €
          </Typography>
        </li>
      </ul>
    </main>
  );
}
