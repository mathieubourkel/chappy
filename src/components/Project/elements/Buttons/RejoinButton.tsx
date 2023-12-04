import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";

type Props = {
    value: string
    onClick?: () => void;
}

export default function RejoinButton({value, onClick}: Props) {

  return (
    <Button className="flex items-center"
    onClick={onClick}>
      <FontAwesomeIcon icon={faSquarePlus} />
      <a className="pl-2 hidden md:flex">{value}</a>
    </Button>
  );
}
