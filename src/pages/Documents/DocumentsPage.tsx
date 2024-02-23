import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import DocumentCard from "../../components/Project/Cards/DocumentCard";
import DocumentsAdd from "../../components/Project/Modals/DocumentsAdd";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/api/projects";
import { getDocumentsByProject } from "../../services/api/documents";
import {
  Alert,
  Spinner
} from "@material-tailwind/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "../../services/utils/NotFoundPage";
import { intProjectLight } from "../../services/interfaces/intProject";
import { intDocument, intDocuments } from "../../services/interfaces/intDocument";

export default function DocumentsPage() {
  const {idProject} = useParams();
  const [project, setProject] = useState<intProjectLight>({_id:'', name:"", code:''})
  const [documents, setDocument] = useState<intDocuments>([]);
  const [reload, setReload] = useState(false)
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const handleReload = () => setReload((bool) => !bool);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpProj = await getProjectById(idProject ||"")
        const result = await getDocumentsByProject(idProject ||"")
        setDocument(result.data)
        setProject(tmpProj.data)
      } catch (error) {
        setError(true)
      } finally {
        setBusy(false);
      }
      
    }
    fetchData();
  }, [idProject, reload]);

  if (error) return (<NotFoundPage />)
  
  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner project={project} idProject={idProject ||""}/>
      <section
          className="flex justify-between mt-20">
        <div className={"w-full flex justify-between gap-5 items-center"}>
          <h2>Les documents</h2>
          <DocumentsAdd handleReload={handleReload}/>
        </div>
      </section>
      {busy ? (
          <div
              className="flex justify-center mt-20">
            <Spinner
                className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
      <div className="mt-5 mb-20">
        {documents.map((document: intDocument) => (
          <DocumentCard
            key={document._id}
            document={document}
            handleReload={handleReload}
          />
        ))}

        {documents.length == 0 &&
            <Alert
            icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
            className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5"
        >
          Aucun document disponible.
        </Alert>}
      </div>
      )}
    </main>
  );
}
