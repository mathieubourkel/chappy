/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from 'react-select'
import makeAnimated from "react-select/animated";
import { intSelects } from '../../../services/interfaces/generique.interface';

type Props = {
    options: intSelects
    handleMultiple: (arraySelect:intSelects, label:string, aliasLabel:string, aliasValue?:string) => void;
    label: string
    placeholder?: string
    alias:string
}

export default function MagicMultipleSelect({options, handleMultiple, label, placeholder, alias}:Props) {
    const animatedComponents = makeAnimated();
  return (
    <ReactSelect
        options={options}
        className="rounded-xl border-select"
        placeholder={placeholder}
        isMulti
        components={animatedComponents}
        onChange={(value: any) => handleMultiple(value, label, alias)}
        theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
            ...theme.colors,
            primary25: 'rgba(126,55,47, 0.2)',
            primary:'rgba(126,55,47, 0.7)',
            primary50: 'rgba(126,55,47, 0.3)',
            },
            fontSize: '0.875rem',
        })}
    />
  )
}
