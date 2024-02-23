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
          className="lg:hidden bg-brick-400 px-4"
          animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
          }}
      >
    <Button size={"sm"} className="bg-brick-300 flex items-center"
    onClick={handleClick}>
      <FontAwesomeIcon icon={faFolderPlus} className={"text-sm"} />
      <span className="pl-2 hidden 2xl:inline whitespace-nowrap">{value}</span>
    </Button>
      </Tooltip>
  );
}
