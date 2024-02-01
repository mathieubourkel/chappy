import {
  Card, CardBody,
  Typography
} from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import { intDocument} from "../../../services/interfaces/intProject";
import DocumentModify from "../Modals/DocumentModifiy";
import { deleteDocumentFromBDD } from "../../../services/api/documents";
import { DocumentTypeEnum } from "../../../services/enums/document.type.enum.ts";

type Props = {
  document: intDocument
  handleReload: () => void;
};

export default function DocumentCard({ document, handleReload }: Props) {

  const getDocumentTypeString = (type: DocumentTypeEnum): string => {
    const typeDocument = Object.entries(DocumentTypeEnum);
    const foundType = typeDocument.find(([, value]) : boolean => value === type);
    return foundType ? foundType[0] : 'N/A';
  };
  
  const handleDelete = async () => {
    await deleteDocumentFromBDD(document.id)
    handleReload()
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
                <DocumentModify
                    document={document}
                    handleReload={handleReload}
                />
                <DeleteButton handleDeleteBDD={handleDelete} />
              </div>
        </CardBody>

      </Card>
    </>
  );
}
