import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intDocument, intDocuments, intProject } from "../../services/interfaces/intProject";
import DocumentCard from "../../components/Project/Cards/DocumentCard";
import DocumentsAdd from "../../components/Project/Modals/DocumentsAdd";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function DocumentsPage({ project, isOwner }: Props) {

  const {idProject} = useParams();
  const [error, setError] = useState(null);
  const [documents, setDocument] = useState<intDocuments>([]);

  useEffect(() => {
    axios
    .get(
      "http://localhost:1337/api/documents?populate[0]=project&filters[project][id][$eq]=" +
        idProject
    )
      .then(({ data }) => setDocument(data.data))
      .catch((error) => setError(error));
  }, [idProject]);

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  return (
    <main className="project-page sm:mx-20 mx-5">
      <ProjectHeader project={project} />
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
