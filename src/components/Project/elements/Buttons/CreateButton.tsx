import {
    faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Tooltip
} from "@material-tailwind/react";

type Props = {
    value:string
    handleClick?: () => void;
}

export default function CreateButton({value, handleClick}:Props) {
  return (
      <Tooltip
          content={value}
          className="md:hidden bg-brick-400 px-4"
          animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
          }}
      >
    <Button className="bg-brick-300 flex items-center"
    onClick={handleClick}>
      <FontAwesomeIcon icon={faFolderPlus} className={"text-sm"} />
      <p className="pl-2 hidden md:flex">{value}</p>
    </Button>
      </Tooltip>
  );
}
