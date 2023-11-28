/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";

type Props = {
  state: any;
  label: string;
  isOwner: boolean;
  setState: (state:any) => void;
  select: Array<any>;
};

export default function SelectInputObject(props: Props) {

  const { state, setState, select, label, isOwner } = props;

  function handleSubmit(value: any) {
    setState({ ...state, [label]: value });
  }

  return (
    <div className="w-full">
      {isOwner ? (
        <Select
          className="p-2 bg-white"
          value={state[label]}
          onChange={(value: any) => handleSubmit(value)}
        >
          {select.map((i: string, indexS: number) => (
            <Option key={indexS} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{state[label]}</Typography>
        </div>
      )}
    </div>
  );
}
