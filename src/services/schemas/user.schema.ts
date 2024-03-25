import { ValidationEnum } from "../enums/validation.enum";

export const UserSchema = [
    {name:'firstname', options:{min:2, max:100}, checks: [ValidationEnum.STR_RANGE]},
    {name:'lastname', options:{min:2, max:100}, checks: [ValidationEnum.STR_RANGE]},
    {name:'email', checks: [ValidationEnum.EMAIL]},
    {name:'address', options:{min:1, max:150}, checks: [ValidationEnum.STR_RANGE]},
    {name:'zip', options:{min:1, max:10}, checks: [ValidationEnum.STR_RANGE]},
    {name:'city', options:{min:1, max:150}, checks: [ValidationEnum.STR_RANGE]},
    {name:'phone', options:{min:1, max:20}, checks: [ValidationEnum.STR_RANGE]},
    {name:'password', checks: [ValidationEnum.REQUIRED, ValidationEnum.PASSWORD]},
    {name:'checkPassword', options:{isIdentic: 'password'}, checks: [ValidationEnum.REQUIRED, ValidationEnum.IS_IDENTIC]},
  ]