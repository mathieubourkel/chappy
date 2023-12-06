import { useEffect, useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import {
  intPurchases,
  intPurchase,
  intProjectLight,
} from "../../services/interfaces/intProject";
import PurchaseCard from "../../components/Project/Cards/PurchaseCard";
import PurchaseAdd from "../../components/Project/Modals/PurchaseAdd";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { useParams } from "react-router-dom";
import { getPurchasesByProject } from "../../services/api/purchases";
import { getProjectById } from "../../services/api/projects";

export default function PurchasesPage() {
  console.log("PurchasePage");
  const { idProject } = useParams();
  const idUser = localStorage.getItem("id");
  const [busy, setBusy] = useState<boolean>(true);
  const [project, setProject] = useState<intProjectLight>({
    id: undefined,
    name: "",
  });
  const [purchases, setPurchase] = useState<intPurchases>([]);
  const [reload, setReload] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const handleReload = () => setReload((bool) => !bool);
  useEffect(() => {
    async function getPurchases() {
      const tmpProj = await getProjectById(idProject);
      const result = await getPurchasesByProject(idProject);
      setBusy(false);
      setPurchase(result);
      setProject(tmpProj);
      tmpProj.user.id.toString() === idUser && setIsOwner(true);
    }

    getPurchases();
  }, [idProject, reload, idUser]);

  const calcul = () => {
    let total: number = 0;
    purchases.map((purchase) => {
      total += Math.floor(purchase.price);
    });
    return total;
  };

  return (
    <main className="project-page sm:mx-20 mx-5 mb-20">
      <ProjectHeader isOwner={isOwner} project={project} idProject={idProject} />
      <section className="b2-header flex justify-between mt-20">
        <div>
          <h2>Mes achats</h2>
        </div>
        {isOwner && (
          <div className="b2-header-buttons flex">
            <PurchaseAdd handleReload={handleReload} />
          </div>
        )}
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <ul className="mt-5">
          {purchases.map((purchase: intPurchase, index: number) => (
            <PurchaseCard
              key={index}
              setPurchase={setPurchase}
              purchases={purchases}
              index={index}
              isOwner={isOwner}
              purchase={purchase}
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
      )}
    </main>
  );
}
