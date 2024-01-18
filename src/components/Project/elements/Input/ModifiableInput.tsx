/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "../../../../services/interfaces/intProject";

type Props = {
  type: string;
  label: string;
  placeHolder: string;
  state: any;
  value: string | number | undefined;
  setState: (element: any) => void;
  isOwner: boolean;
  handleBdd?: any;
};

export default function ModifiableInput(props: Props) {
  const { type, label, placeHolder, handleBdd, setState, state, value, isOwner } = props;
  const [display, setDisplay] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tmpValue = e.currentTarget[label].value;
    const tmpData = {...state, [label]: tmpValue}
    await handleBdd(tmpData)
    setState(tmpData);
    setDisplay(true);
  }
  const handleDisplay = () => {
    setDisplay(false);
  }

  return (
    <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
      {display ? (
        <div className="flex w-full gap-2">
          <div className="flex items-center w-full false-input">
            <Typography className="p-2 text-text-100">{value}</Typography>
          </div>
          {isOwner && (
            <IconButton onClick={handleDisplay} ripple={true}>
              <FontAwesomeIcon icon={faPen} />
            </IconButton>
          )}
        </div>
      ) : (
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full !bg-white">
            <Input
                className={"!border-gray-700/50 !text-text-100 focus:!border-gray-700/50"}
              type={type}
              name={label}
              id={label}
              defaultValue={state[label]}
              placeholder={placeHolder}
              crossOrigin={undefined}
            />
          </div>
          <IconButton
            className="flex justify-end bg-marine-100"
            ripple={true}
            type="submit"
          >
            <FontAwesomeIcon icon={faCheck} size={"xl"}/>
          </IconButton>
        </form>
      )}
    </div>
  );
}
