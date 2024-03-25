import { ValidationEnum } from "../enums/validation.enum";

export const StepSchema = [
    {name:'description', options:{min:1, max:150}, checks: [ValidationEnum.STR_RANGE]},
    {name:'budget', checks: [ValidationEnum.NUMBER_INTEGER, ValidationEnum.REQUIRED]},
    {name:'name', options:{min:1, max:50}, checks: [ValidationEnum.STR_RANGE]},
    {name:'estimEndDate', checks: [ValidationEnum.DATE]},
    {name:'status', checks: [ValidationEnum.SELECT]},
  ]