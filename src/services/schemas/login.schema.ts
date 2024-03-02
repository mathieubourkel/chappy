import { ValidationEnum } from "../enums/validation.enum";

export const LoginSchema = [
    {name:'email', checks: [ValidationEnum.EMAIL]},
    {name:'password', checks: [ValidationEnum.PASSWORD]},
  ]