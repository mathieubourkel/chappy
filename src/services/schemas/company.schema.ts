import { ValidationEnum } from "../enums/validation.enum";

export const CompanySchema = [
    {name:'name', options:{min:2, max:100}, checks: [ValidationEnum.STR_RANGE]},
    {name:'additionalInfos', options:{min:2, max:100}, checks: [ValidationEnum.STR_RANGE]},
    {name:'description', options:{min:2, max:200}, checks: [ValidationEnum.STR_RANGE]},
  ]