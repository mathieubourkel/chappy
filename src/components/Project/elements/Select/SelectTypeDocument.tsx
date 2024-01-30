/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { enumType } from "../../../../services/interfaces/Type.tsx";
import { useState } from "react";
import { intSelectDocument } from "../../../../services/interfaces/intProject.tsx";

type Props = {
  classState?: string;
  handleDocument: (type: intSelectDocument) => void;
  value? :intSelectDocument
};

export default function SelectTypeDocument({ handleDocument, value, classState }: Props) {
  const animatedComponents = makeAnimated();
    const [selected, setSelected] = useState<any>(value);

    function handleDocumentsEnfant(value: intSelectDocument) {
        setSelected(value);
        handleDocument(value);
    }

  return (
      <div className={classState}>
          <ReactSelect
              options={enumType}
              placeholder="Type de document"
              value={selected}
              defaultValue={enumType[0]}
              components={animatedComponents}
              onChange={(value: any) => handleDocumentsEnfant(
                  value)}
              className={"border-select"}
              theme={(theme) => (
                  {
                      ...theme,
                      borderRadius: 5,
                      colors: {
                          ...theme.colors,
                          primary: 'rgba(126,55,47, 0.7)',
                          primary25: 'rgba(126,55,47, 0.2)',
                          primary50: 'rgba(126,55,47, 0.3)',
                      },
                      fontSize: '0.875rem',
                  }
              )}
          />
      </div>
  );
}
