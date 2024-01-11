import { useEffect, useState } from "react";
import {
  Alert,
  Card, CardBody,
  Spinner,
} from "@material-tailwind/react";
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
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

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
    <main className="sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner={isOwner} project={project} idProject={idProject} />
      <section
          className={"w-full flex justify-between gap-5 items-center"}>
        <div>
          <h2>Mes achats</h2>
        </div>
        {isOwner && (
              <PurchaseAdd
                  handleReload={() => setReload(
                      (bool) => !bool)}/>
        )}
      </section>
      {busy ? (
          <div
              className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="mt-5 mb-20">
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

          {purchases.length == 0 &&
              <Alert
                  icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                  className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5"
              >
                Aucun achat recensé.
              </Alert>}

          <Card
              className="custom-card-purchase-all mb-8"
          >
            <CardBody className="flex lg:justify-between justify-center flex-wrap">
                <span className="text-marine-300 uppercase font-extrabold mr-5">TOTAL</span>
              <div
                className="border rounded-xl text-light-100 bg-brick-300"
              >
                <span className={"mx-7"}>
                  {calculateTotal()} €
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </main>
  );
}
