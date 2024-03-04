/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from 'react-select'
import makeAnimated from "react-select/animated";
import { intSafeSelect, intSelect, intSelects } from '../../../services/interfaces/generique.interface';

type Props = {
    options: intSelects
    handleSelect?: (value:intSafeSelect, label:string, multiple?:string) => void;
    label: string
    placeholder?: string
    renderErrors?: (label:string) => void;
    disabled?:boolean
    value?:intSelect
}

export default function MagicSelect({options, value,handleSelect, disabled, label, placeholder, renderErrors}:Props) {
    const animatedComponents = makeAnimated();
  return (
    <>
    <ReactSelect
        options={options}
        className="rounded-xl border-select"
        placeholder={placeholder}
        isDisabled={disabled}
        value={value}
        defaultValue={options[0].label}
        components={animatedComponents}
        onChange={(value: any) => handleSelect && handleSelect(value, label)}
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
    {renderErrors && renderErrors(label)}
    </>
  )
}
