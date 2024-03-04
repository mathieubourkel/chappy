import { ValidationEnum } from "../enums/validation.enum";

export const ComptaSchema = [
    {name:'description', options:{min:1, max:150}, checks: [ValidationEnum.STR_RANGE]},
    {name:'price', checks: [ValidationEnum.NUMBER_INTEGER, ValidationEnum.REQUIRED]},
    {name:'commandDate', checks: [ValidationEnum.DATE]},
    {name:'deliveryDate', checks: [ValidationEnum.DATE]},
    {name:'status', checks: [ValidationEnum.SELECT]},
  ]