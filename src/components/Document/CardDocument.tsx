import {Card, CardBody,Typography} from "@material-tailwind/react";
import DocumentModify from "./ModalModifyDocument.tsx";
import { deleteDocumentFromBDD } from "../../services/api/documents.ts";
import { DocumentTypeEnum } from "../../services/enums/document.type.enum.ts";
import { intDocument, intDocuments } from "../../services/interfaces/intDocument.tsx";
import { useState } from "react";
import MagicIconButton from "../elements/Buttons/MagicIconButton.tsx";
import { ButtonTypeEnum } from "../../services/enums/button.type.ts";

type Props = {
  document: intDocument
  documents: intDocuments
  setDocuments: (documents:intDocuments) => void;
};

export default function CardDocument({ document, documents, setDocuments }: Props) {

  const [stateDocument, setStateDocument] = useState<intDocument>(document)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const getDocumentTypeString = (type: DocumentTypeEnum): string => {
    const typeDocument = Object.entries(DocumentTypeEnum);
    const foundType = typeDocument.find(([, value]) : boolean => value === type);
    return foundType ? foundType[0] : 'N/A';
  };
  
  const handleDelete = async () => {
    await deleteDocumentFromBDD(document._id)
    // BESOIN DE TRAITER LE TABLEAU
    setDocuments([...documents])
  }

  return (
      <Card className="custom-card-doc mb-5">
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
                <MagicIconButton type={ButtonTypeEnum.MODIFY} handleClick={handleOpen}/>
                <MagicIconButton type={ButtonTypeEnum.DELETE} handleClick={handleDelete}/>
                <DocumentModify document={stateDocument} setDocument={setStateDocument} open={open} handleOpen={handleOpen}/>
              </div>
        </CardBody>
      </Card>
  );
}
