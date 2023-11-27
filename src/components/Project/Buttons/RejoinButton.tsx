import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";

type Props = {
    value: string
}

export default function RejoinButton({value}: Props) {

  return (
    <Button className="flex items-center">
      <FontAwesomeIcon icon={faSquarePlus} />
      <a className="pl-2 hidden md:flex">{value}</a>
    </Button>
  );
}
