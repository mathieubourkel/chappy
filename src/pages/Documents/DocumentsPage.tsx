import { useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intDocument, intDocuments, intProject } from "../../services/interfaces/intProject";
import DocumentCard from "../../components/Project/Cards/DocumentCard";
import DocumentsAdd from "../../components/Project/Modals/DocumentsAdd";

type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function DocumentsPage({ project, isOwner }: Props) {

  const [documents, setDocument] = useState<intDocuments>([
    { name: "Devis", type: "pdf" },
    { name: "Facture", type: "word" },
    { name: "Contrat", type: "pdf" },
    { name: "Photo", type: "png" },
  ]);

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
