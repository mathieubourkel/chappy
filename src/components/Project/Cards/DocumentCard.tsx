import {
  Card, CardBody,
  Typography
} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import { intDocument, intDocuments } from "../../../services/interfaces/intProject";
import DocumentModify from "../Modals/DocumentModifiy";
import { deleteDocumentFromBDD } from "../../../services/api/documents";
import { DocumentTypeEnum } from "../../../services/enums/document.type.enum.ts";

type Props = {
  index: number;
  setDocument: (documents: intDocuments) => void;
  documents: intDocuments;
  isOwner: boolean
  document: intDocument
};

export default function DocumentCard({ index, setDocument,document, documents, isOwner }: Props) {

  const getDocumentTypeString = (type: DocumentTypeEnum): string => {
    const typeDocument = Object.entries(DocumentTypeEnum);
    console.log(typeDocument)
    const foundType = typeDocument.find(([, value]) : boolean => value === type);
    console.log(foundType)
    return foundType ? foundType[0] : 'N/A';
  };
  
  const handleDelete = () => {
    deleteDocumentFromBDD(document.id)
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

          {isOwner &&
              <div className='flex justify-end'>
                <DocumentModify
                    documents={documents}
                    setDocument={setDocument}
                    index={index}
                />
                <DeleteButton handleDeleteBDD={handleDelete} />
              </div>
          }
        </CardBody>

      </Card>
    </>
  );
}
