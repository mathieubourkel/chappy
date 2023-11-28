import { useEffect, useState } from "react";

import { Typography } from "@material-tailwind/react";
import {
  intPurchases,
  intProject,
  intPurchase,
} from "../../services/interfaces/intProject";
import PurchaseCard from "../../components/Project/Cards/PurchaseCard";
import PurchaseAdd from "../../components/Project/Modals/PurchaseAdd";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function MembersPage({ project, isOwner }: Props) {
  
  const { idProject } = useParams();
  const [error, setError] = useState(null);
  const [purchases, setPurchase] = useState<intPurchases>([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/api/purchases?populate[0]=project&filters[project][id][$eq]=" +
          idProject
      )
      .then(({ data }) => setPurchase(data.data))
      .catch((error) => setError(error));
  }, [idProject]);

  const calcul = () => {
    let total: number = 0;
    purchases.map((purchase) => {
      total += Math.floor(purchase.price);
    });
    return total;
  };

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

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
