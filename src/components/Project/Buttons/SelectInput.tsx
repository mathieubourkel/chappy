/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";

type Props = {
  state: any;
  label: string;
  classState: string;
  isOwner: boolean;
  index: number;
  setState: any;
  select: Array<any>;
};

export default function SelectInput({
  state,
  setState,
  select,
  label,
  classState,
  isOwner,
  index,
}: Props) {

  function handleSubmit(value: any, index: number) {
    const tempArray = [...state];
    tempArray[index][label] = value;
    setState(tempArray);
  }
  return (
    <div className={classState}>
      {isOwner ? (
        <Select
          className="border border-brick-300 rounded-xl p-2 text-brick-300"
          value={state[index].status}
          onChange={(value: any) => handleSubmit(value, index)}
        >
          {select.map((i: string, indexS: number) => (
            <Option key={indexS} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{state[index][label]}</Typography>
        </div>
      )}
    </div>
  );
}
