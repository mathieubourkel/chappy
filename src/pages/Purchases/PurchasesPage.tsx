import { useEffect, useState } from "react";
import {
  Alert,
  Card, CardBody,
  Spinner,
} from "@material-tailwind/react";
import {
  intPurchase,
  intPurchases,
  intProjectLight,
} from "../../services/interfaces/intProject";
import PurchaseCard from "../../components/Project/Cards/PurchaseCard";
import PurchaseAdd from "../../components/Project/Modals/PurchaseAdd";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { useParams } from "react-router-dom";
import { getPurchasesByProject } from "../../services/api/purchases";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "../../services/utils/NotFoundPage";
import { getProjectById } from "../../services/api/projects";

export default function PurchasesPage() {
  const { idProject } = useParams();
  const [busy, setBusy] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<intPurchases>([])
  const [project, setProject] = useState<intProjectLight>({id:undefined, name:"", code:''})
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpProj = await getProjectById(idProject)
        const result = await getPurchasesByProject(idProject)
        setProject(tmpProj);
        setPurchases(result)
      } catch (error) {
        setError(true)
      } finally {
        setBusy(false)
      }
    }
    fetchData();
  }, [idProject, reload]);

  const handleReload = () => setReload((bool) => !bool);
  const calculateTotal = () => {
    return purchases.reduce((total, purchase) => total + Math.floor(purchase.price), 0);
  };

  if (error) return (<NotFoundPage />)
  
  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner project={project} idProject={idProject} />
      <section
          className={"w-full flex justify-between gap-5 items-center"}>
        <div>
          <h2>Mes achats</h2>
        </div>
        <PurchaseAdd handleReload={() => setReload((bool) => !bool)}/>
      </section>
      {busy ? (
          <div
              className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="mt-5 mb-20">
          {purchases.map((purchase: intPurchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              handleReload={handleReload}
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
