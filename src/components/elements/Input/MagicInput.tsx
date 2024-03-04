/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Textarea } from '@material-tailwind/react'
import { InputEvent } from '../../../services/interfaces/generique.interface';

type Props = {
    name:string;
    label:string
    value?:string
    handleChange?: (event:InputEvent) => void;
    renderErrors?: (name:string) => void;
    type?:string
    disabled?: boolean
}

export default function MagicInput({name,value, label, handleChange, renderErrors, type, disabled}:Props) {
  
  if (type ==='text') return (
    <>
    <Textarea
        label={label}
        size="lg"
        value={value}
        className={"bg-select"}
        name={name}
        id={name}
        onChange={(e: any) => handleChange && handleChange(e)}
        disabled={disabled}
        />
        {renderErrors && renderErrors(name)}
        </>
  )

    return (
    <>
        <Input
            label={label}
            name={name}
            id={name}
            value={value}
            type={type}
            className={"!bg-light-100"}
            onChange={(e: InputEvent) => handleChange && handleChange(e)}
            crossOrigin={undefined}
            disabled={disabled}
        />
        {renderErrors && renderErrors(name)}
    </>
  )
}
