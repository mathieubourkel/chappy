import { Typography } from "@material-tailwind/react";
import DeleteButton from "../elements/Buttons/DeleteButton";
import { intDocument, intDocuments } from "../../../services/interfaces/intProject";
import DocumentModify from "../Modals/DocumentModifiy";
import { deleteDocumentFromBDD } from "../../../services/api/documents";

type Props = {
  index: number;
  setDocument: (documents: intDocuments) => void;
  documents: intDocuments;
  isOwner: boolean
  document: intDocument
};

export default function DocumentCard({ index, setDocument,document, documents, isOwner }: Props) {
  
  console.log('DocumentCardComposant')
  const handleDelete = () => {
    deleteDocumentFromBDD(document.id)
  }
  return (
    <>
      <li
        className="md:flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 mb-10 border-b-brick-200"
      >
        <div className='sm:flex gap-10'>
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            {document.type}
          </p>
        </Typography>
        <Typography
          variant="h5"
          color="blue-gray"
          className="p-2 text-brick-300 font-bold"
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
        <DeleteButton index={index} handleDeleteBDD={handleDelete} state={documents} setState={setDocument} />
        </div>}
      </li>
    </>
  );
}
