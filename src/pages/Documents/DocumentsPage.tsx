import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intDocument, intDocuments, intProjectLight} from "../../services/interfaces/intProject";
import DocumentCard from "../../components/Project/Cards/DocumentCard";
import DocumentsAdd from "../../components/Project/Modals/DocumentsAdd";
import { useParams } from "react-router-dom";
import { getProjectNameById } from "../../services/api/projects";
import { getDocumentsByProject } from "../../services/api/documents";

type Props = {
  isOwner: boolean;
};

export default function DocumentsPage({ isOwner }: Props) {
  console.log('DocumentsPage')
  const {idProject} = useParams();
  const [project, setProject] = useState<intProjectLight>({id:0, name:""})
  const [documents, setDocument] = useState<intDocuments>([]);
  
  useEffect(() => {
    async function getDocuments(){
      const tmpProj = await getProjectNameById(idProject)
      const result = await getDocumentsByProject(idProject)
      setDocument(result)
      setProject(tmpProj)
    }

    getDocuments();
  }, [idProject]);
  return (
    <main className="project-page sm:mx-20 mx-5">
      <ProjectHeader project={project} idProject={idProject}/>
      <section className="b2-header flex justify-between mt-20">
        <div>
          <h2>Mes documents</h2>
        </div>
        {isOwner && (
          <div className="b2-header-buttons flex">
            <DocumentsAdd documents={documents} setDocument={setDocument} />
          </div>
        )}
      </section>
      <ul className="mt-5">
        {documents.map((_document: intDocument, index: number) => (
          <DocumentCard
            key={index}
            setDocument={setDocument}
            documents={documents}
            index={index}
            isOwner={isOwner}
          />
        ))}
      </ul>
    </main>
  );
}
