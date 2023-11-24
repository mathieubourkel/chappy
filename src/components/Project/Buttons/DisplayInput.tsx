/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@material-tailwind/react";

type Props = {
  value: any;
  state: boolean;
  setState: (bool: boolean) => void;
  isOwner: boolean
};

export default function DisplayInput({ value, state, setState, isOwner }: Props) {
  function handleDisplay() {
    state ? setState(false) : setState(true);
  }

  return (
    <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
      <div className="flex w-full rounded-md bg-white">
        <Typography className="p-2">{value}</Typography>
      </div>
      {isOwner &&
      <IconButton onClick={handleDisplay} ripple={true}>
        <FontAwesomeIcon icon={faPen} />
      </IconButton> }
    </div>
  );
}
