import { colors } from "@material-tailwind/react/types/generic";
import { ChangeEvent } from "react"

export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type intStatus = string[]
export type intSelects = intSelect[]

export interface intRangeDate {
    startDate: Date,
    endDate: Date
}

export type intSelect = {
    value: number | null | string
    label: string | undefined
  };

export interface intAlert {
    open:boolean,
    color: colors | undefined
    message: string,
    reDisplay?:boolean
}

