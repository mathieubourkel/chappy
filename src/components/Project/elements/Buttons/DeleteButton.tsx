import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-tailwind/react";

type Props = {
  handleDeleteBDD?: () => void;
};

export default function DeleteButton({ handleDeleteBDD }: Props) {
  function handleDelete() {
    if (handleDeleteBDD) {
      handleDeleteBDD();
    }
  }

  return (
    <IconButton
        size={"sm"}
        onClick={() => handleDelete()}>
      <FontAwesomeIcon icon={faXmark} className={"text-sm"}
      size={"sm"}/>
    </IconButton>
  );
}
