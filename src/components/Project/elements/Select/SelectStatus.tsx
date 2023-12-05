/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumStatus } from "../../../../services/interfaces/Status";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { intSelect } from "../../../../services/interfaces/intProject";

type Props = {
  classState?: string;
  handleStatus: (status: intSelect) => void;
  defaultValue?: intSelect;
};

export default function SelectStatus({
  handleStatus,
  classState,
  defaultValue,
}: Props) {
  console.log("SelectStatusCOmponent");
  const animatedComponents = makeAnimated();

  function handleStatusEnfant(value: any) {
    tmpStatus = value;
    handleStatus(value);
  }

  let tmpStatus: intSelect;
  defaultValue ? (tmpStatus = defaultValue) : (tmpStatus = enumStatus[0]);
  return (
    <div className={classState}>
      <ReactSelect
        options={enumStatus}
        className="rounded-xl"
        placeholder="Status"
        value={tmpStatus}
        components={animatedComponents}
        onChange={(value: any) => handleStatusEnfant(value)}
      />
    </div>
  );
}
