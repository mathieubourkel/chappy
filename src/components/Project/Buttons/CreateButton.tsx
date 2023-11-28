import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";

type Props = {
    value:string
    handleClick?: () => void;
}

export default function CreateButton({value, handleClick}:Props) {
  return (
    <Button className="bg-brick-300 flex items-center"
    onClick={handleClick}>
      <FontAwesomeIcon icon={faSquarePlus} />
      <a className="pl-2 hidden md:flex">{value}</a>
    </Button>
  );
}
