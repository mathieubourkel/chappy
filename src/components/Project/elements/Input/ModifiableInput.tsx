/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "../../../../services/interfaces/intProject";
import { useState } from "react";

type Props = {
  type: string;
  label: string;
  placeHolder: string;
  state: any;
  value: string;
  setState: (element: any) => void;
  isOwner: boolean;
  handleBdd?: any;
};
let count = 1;
export default function ModifiableInput(props: Props) {
  console.log("ModifiableInputComposant" + count++)
  const { type, label, placeHolder, handleBdd, setState, state, value, isOwner } = props;
  const [display, setDisplay] = useState(true);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = e.currentTarget[label].value;
    const tmpData = {...state, [label]: value}
    await handleBdd(tmpData)
    setState(tmpData);
    setDisplay(true);
  }
  function handleDisplay() {
    setDisplay(false);
  }

  return (
    <div className="b1-body-budget flex basis-1/2 gap-2 mb-5">
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
              defaultValue={state[label]}
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
