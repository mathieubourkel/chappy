// import { intCompany } from "./intCompany";
// import { intEmployee } from "./intEmployee";
// import { intUsers } from "./intUser";

// export interface intForms extends intUsers, intCompany, intEmployee {}

export interface intForms {
    lastname: string,
    firstname: string,
    email: string,
    address: string,
    postal: number | null,
    city: string,
    phone: number | null,
    password: string,
    checkPassword: string,
    companyName?: string,
    siret?: number | null,
    companySActivity?: string,
    companyNameEmployee?: string,
}