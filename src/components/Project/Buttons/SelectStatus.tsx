/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";
import { Status } from "../../../services/interfaces/Status";
import { useState } from "react";

type Props = {
  state: any;
  classState: string;
  isOwner: boolean;
  index: number;
};

export default function SelectStatus(props: Props) {

  const { state, classState, isOwner, index } = props;
  const [selected, setSelected] = useState(Status[state[index].status])

  function handleSubmit(value: any) {
    setSelected(value);
  }

  return (
    <div className={classState}>
      {isOwner ? (
        <Select
          className="border border-brick-300 rounded-xl p-2 text-brick-300"
          value={selected}
          onChange={(value: any) => handleSubmit(value)}
        >
          {Status.map((i: string, indexS: number) => (
            <Option key={indexS} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{state[index].status}</Typography>
        </div>
      )}
    </div>
  );
}
