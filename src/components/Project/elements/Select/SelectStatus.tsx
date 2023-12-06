/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumStatus } from "../../../../services/interfaces/Status";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { intSelect } from "../../../../services/interfaces/intProject";
import { useEffect, useState } from "react";

type Props = {
  classState?: string;
  handleStatus: (status: intSelect) => void;
  value?: intSelect;
};

export default function SelectStatus({
  handleStatus,
  classState,
  value,
}: Props) {
  console.log("SelectStatusCOmponent");
  const animatedComponents = makeAnimated();
  const [selected, setSelected] = useState<any>(value);
  function handleStatusEnfant(value: intSelect) {
    setSelected(value);
    handleStatus(value);
  }

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className={classState}>
      <ReactSelect
        options={enumStatus}
        className="rounded-xl"
        placeholder="Status"
        value={selected}
        defaultValue={enumStatus[0]}
        components={animatedComponents}
        onChange={(value: any) => handleStatusEnfant(value)}
      />
    </div>
  );
}
