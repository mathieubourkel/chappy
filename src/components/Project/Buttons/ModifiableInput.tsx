/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "../../../services/interfaces/intProject";
import { useState } from "react";

type Props = {
  type: string;
  label: string;
  placeHolder: string;
  state: any;
  value: string;
  setState: (element: any) => void;
  isOwner: boolean;
};

export default function ModifyInput({
  type,
  label,
  placeHolder,
  setState,
  state,
  value,
  isOwner,
}: Props) {

  const [display, setDisplay] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = e.currentTarget[label].value;
    setState({ ...state, [label]: value });
    setDisplay(true);
  };
  function handleDisplay() {
    setDisplay(false);
  }
  
  return (
    <div className="b1-body-budget flex w-full gap-2 mb-5">
      {display ? (
        <div className="flex w-full gap-2">
          <div className="flex w-full rounded-md bg-white">
            <Typography className="p-2">{value}</Typography>
          </div>
          {isOwner && (
            <IconButton onClick={handleDisplay} ripple={true}>
              <FontAwesomeIcon icon={faPen} />
            </IconButton>
          )}
        </div>
      ) : (
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full bg-white rounded-md">
            <Input
              className="p-2"
              type={type}
              name={label}
              id={label}
              placeholder={placeHolder}
              crossOrigin={undefined}
            />
          </div>
          <IconButton
            className="basis-1/12 flex justify-end"
            ripple={true}
            type="submit"
          >
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
        </form>
      )}
    </div>
  );
}
