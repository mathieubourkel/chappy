import { Select, Option, Typography } from "@material-tailwind/react";
import { Status } from "../../../services/interfaces/Status";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: Array<any> | any;
  classState: string;
  isOwner: boolean;
  index?: number | undefined;
};

export default function SelectStatus(props: Props) {
  const { state, classState, isOwner, index } = props;

  let selected: string | undefined = Status[0];

  if (typeof index !== "undefined" && typeof state.status == "number") {
    selected = Status[state[index].status];
  }
  if (typeof index === "undefined" && typeof state.status == "string") {
    selected = state.status;
  } else if (typeof index === "undefined" && typeof state !== "undefined") {
    selected = Status[state.status];
  }

  function handleSubmit(value: string | undefined) {
    selected = value;
    // Function POST dans BDD
  }

  return (
    <div className={classState}>
      {isOwner ? (
        <Select
          className="rounded-xl p-2 bg-white"
          value={selected}
          label="status"
          name="status"
          id="status"
          onChange={(value: string | undefined) => handleSubmit(value)}
        >
          {Status.map((i: string, indexS: number) => (
            <Option key={indexS} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="flex w-full rounded-md bg-white">
          <Typography className="p-2">{selected}</Typography>
        </div>
      )}
    </div>
  );
}
