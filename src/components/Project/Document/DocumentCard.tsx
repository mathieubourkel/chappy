import {Card, CardBody,Typography} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton.tsx";
import DocumentModify from "./DocumentModifiy.tsx";
import { deleteDocumentFromBDD } from "../../../services/api/documents.ts";
import { DocumentTypeEnum } from "../../../services/enums/document.type.enum.ts";
import { intDocument, intDocuments } from "../../../services/interfaces/intDocument.tsx";
import { useState } from "react";

type Props = {
  document: intDocument
  documents: intDocuments
  setDocuments: (documents:intDocuments) => void;
};

export default function DocumentCard({ document, documents, setDocuments }: Props) {

  const [stateDocument, setStateDocument] = useState<intDocument>(document)

  const getDocumentTypeString = (type: DocumentTypeEnum): string => {
    const typeDocument = Object.entries(DocumentTypeEnum);
    const foundType = typeDocument.find(([, value]) : boolean => value === type);
    return foundType ? foundType[0] : 'N/A';
  };
  
  const handleDelete = async () => {
    await deleteDocumentFromBDD(document._id)
    setDocuments([...documents])
  }

  return (
    <>
      <Card
        className="custom-card-doc mb-5"
      >
        <CardBody className={"flex lg:justify-between justify-center flex-wrap"}>
          <div className="flex gap-2 items-center">
            <div
                className="border p-1 rounded-xl bg-light-200 m-2 text-sm text-marine-300 font-bold ml-5 uppercase">
              {getDocumentTypeString(document.type)}
              {/* {lesEnumOnAimePasCa[document.type]} */}
            </div>
            <Typography
                variant="h5"
                className="ml-3 text-marine-300 text-sm"
            >
              {document.path}
            </Typography>
          </div>
              <div className='flex justify-end'>
                <DocumentModify document={stateDocument} setDocument={setStateDocument}/>
                <DeleteButton handleDeleteBDD={handleDelete} />
              </div>
        </CardBody>

      </Card>
    </>
  );
}
