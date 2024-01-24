// import { intCompany } from "./intCompany";
// import { intEmployee } from "./intEmployee";
// import { intUsers } from "./intUser";

// export interface intForms extends intUsers, intCompany, intEmployee {}


export interface intForms {
   
    // role: {id: number},
   userInfos: {
    lastname: string,
    firstname: string,
    email: string,
    address: string,
    zip: number | null,
    city: string,
    phone: number | null,
    password: string,
    checkPassword: string,
   },
   companyInfos: {
    name?: string,
    siret?: string,
    description?: string,
   }
    companyNameEmployee?: string,
}