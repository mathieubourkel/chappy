import { intCompany } from "./intCompany";
import { intUser } from "./intUser";

export interface intRegister {
    userInfos: intUser,
    companyInfos: intCompany,
}

export interface intLogin {
    email: string,
    password:string,
}

export interface intConfirmPwd {
    newPwd:string
    confirmNewPwd: string
}

export interface intOldPwd {
    newPwd:string
    oldPwd: string
}