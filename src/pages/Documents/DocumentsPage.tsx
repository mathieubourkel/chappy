import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intDocument, intDocuments, intProjectLight} from "../../services/interfaces/intProject";
import DocumentCard from "../../components/Project/Cards/DocumentCard";
import DocumentsAdd from "../../components/Project/Modals/DocumentsAdd";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/api/projects";
import { getDocumentsByProject } from "../../services/api/documents";
import { Spinner } from "@material-tailwind/react";

export default function DocumentsPage() {
  console.log('DocumentsPage')
  const {idProject} = useParams();
  const [project, setProject] = useState<intProjectLight>({id:undefined, name:""})
  const [documents, setDocument] = useState<intDocuments>([]);
  const [reload, setReload] = useState(false)
  const idUser = localStorage.getItem("id");
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const handleReload = () => setReload((bool) => !bool);
  
  useEffect(() => {
    async function getDocuments(){
      const tmpProj = await getProjectById(idProject)
      const result = await getDocumentsByProject(idProject)
      setBusy(false);
      setDocument(result)
      setProject(tmpProj)
      tmpProj.user.id.toString() === idUser && setIsOwner(true);
    }

    getDocuments();
  }, [idProject, reload, idUser]);

  return (
    <main className="project-page sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner={isOwner} project={project} idProject={idProject}/>
      <section className="b2-header flex justify-between mt-20">
        <div>
          <h2>Mes documents</h2>
        </div>
        {isOwner && (
          <div className="b2-header-buttons flex">
            <DocumentsAdd handleReload={handleReload} />
          </div>
        )}
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
      <ul className="mt-5">
        {documents.map((document: intDocument, index: number) => (
          <DocumentCard
            key={index}
            setDocument={setDocument}
            documents={documents}
            index={index}
            isOwner={isOwner}
            document={document}
          />
        ))}
      </ul>
      )}
    </main>
  );
}
