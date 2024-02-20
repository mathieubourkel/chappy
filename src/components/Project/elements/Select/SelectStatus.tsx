/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { intSelect } from "../../../../services/interfaces/generique.interface";
import { enumStatus } from "../../../../services/enums/status.enum";

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
        placeholder="Status"
        value={selected}
        defaultValue={enumStatus[0]}
        components={animatedComponents}
        onChange={(value: any) => handleStatusEnfant(value)}
        className={"border-select"}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary:'rgba(126,55,47, 0.7)',
            primary25: 'rgba(126,55,47, 0.2)',
            primary50: 'rgba(126,55,47, 0.3)',
          },
          fontSize: '0.875rem',
        })}
      />
    </div>
  );
}
