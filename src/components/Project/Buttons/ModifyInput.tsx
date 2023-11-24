/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
  type: string;
  label: string;
  placeHolder: string;
  state: any;
  setState: (element:any) => void;
  setDisplay: (bool:boolean) => void;
};

export default function ModifyInput({
  type,
  label,
  placeHolder,
  setState,
  state,
  setDisplay,
}: Props) {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const value = e.currentTarget[label].value;
    setState({ ...state, [label]: value });
    setDisplay(true);
  };

  return (
    <form
      className="b1-body-budget flex basis-1/2 gap-2"
      onSubmit={handleSubmit}
    >
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
  );
}
