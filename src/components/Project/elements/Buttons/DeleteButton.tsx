import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-tailwind/react";

type Props = {
  handleDeleteBDD: () => void;
};

export default function DeleteButton({ handleDeleteBDD }: Props) {
  function handleDelete() {
    handleDeleteBDD();
  }

  return (
    <IconButton onClick={() => handleDelete()}>
      <FontAwesomeIcon icon={faXmark} size="xl" />
    </IconButton>
  );
}
