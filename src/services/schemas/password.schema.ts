import { ValidationEnum } from "../enums/validation.enum";

export const ForgotPasswordSchema = [
    {name:'newPwd', checks: [ValidationEnum.PASSWORD]},
    {name:'confirmNewPwd', options:{isIdentic: 'newPwd'}, checks: [ValidationEnum.REQUIRED, ValidationEnum.IS_IDENTIC]},
  ]