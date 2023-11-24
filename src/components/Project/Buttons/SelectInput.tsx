/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Option, Typography } from "@material-tailwind/react";

type Props = {
    state: Array<any>,
    label: string,
    classState: string,
    isOwner: boolean
}

export default function SelectInput({ state, label, classState, isOwner }: Props) {
   
    return (
    <div className={classState}>
        {isOwner ?
      <Select className="bg-white" label={label}>
        {state.map((element: any, index: number) => (
          <Option key={index}>{element.name}</Option>
        ))}
      </Select>
        : <div className="flex w-full rounded-md bg-white">
        <Typography className="p-2">{state[0].name}</Typography>
      </div>}
    </div>
  );
}
