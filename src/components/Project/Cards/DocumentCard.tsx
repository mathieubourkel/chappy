import { Typography } from "@material-tailwind/react";
import DeleteButton from "../Buttons/DeleteButton";
import { intDocuments } from "../../../services/interfaces/intProject";

type Props = {
  index: number;
  setDocument: (documents: intDocuments) => void;
  documents: intDocuments;
  isOwner: boolean
};

export default function DocumentCard({ index, setDocument, documents, isOwner }: Props) {

  return (
    <>
      <li
        className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200"
      >
        <Typography variant="h5" color="blue-gray" className="flex">
          <p className="border p-2 rounded-xl bg-light-200">
            {documents[index].type}
          </p>
        </Typography>
        <Typography
          variant="h5"
          color="blue-gray"
          className="p-2 text-brick-300"
        >
          {documents[index].name}
        </Typography>
        {isOwner &&
        <DeleteButton index={index} state={documents} setState={setDocument} />}
      </li>
    </>
  );
}
