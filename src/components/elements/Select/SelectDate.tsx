/* eslint-disable @typescript-eslint/no-explicit-any */
import Datepicker from "react-tailwindcss-datepicker";

type Props = {
  value1: any
  value2?:any
  handleDate: (value:any, label:string, label2?:string) => void;
  label:string;
  label2?:string;
  placeholder: string
  renderErrors?: (label:string) => void;
  disabled?:boolean
}

export default function SelectDate({value1, value2, handleDate, disabled,placeholder, label, label2, renderErrors}:Props) {
  if (!value2) value2 = value1
  return (
    <>
    <Datepicker
      inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-text-100 text-text-100 border-select placeholder:!text-sm"
      onChange={(value:any) => handleDate(value, label, label2)}
      value={{
        startDate: value1,
        endDate: value2,
      }}
      useRange={!label2 ? false : true}
      asSingle={!label2 && true}
      placeholder={placeholder}
      disabled={disabled}
    />
    {renderErrors && renderErrors(label)}
    </>
  );
}
