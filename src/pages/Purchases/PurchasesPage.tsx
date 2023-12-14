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
    name: "", code:''
  });
  const [purchases, setPurchases] = useState<intPurchases>([]);
  const [reload, setReload] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const [projectData, purchasesData] = await Promise.all([
          getProjectById(idProject),
          getPurchasesByProject(idProject),
        ]);

        setProject(projectData);
        setPurchases(purchasesData);
        setIsOwner(projectData.owner.id.toString() === idUser);
        setBusy(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [idProject, reload, idUser]);

  const calculateTotal = () => {
    return purchases.reduce((total, purchase) => total + Math.floor(purchase.price), 0);
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
             <PurchaseAdd handleReload={() => setReload((bool) => !bool)} />
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
              setPurchase={setPurchases}
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
                {calculateTotal()} €
              </Typography>
            </div>
          </li>
        </ul>
      )}
    </main>
  );
}
