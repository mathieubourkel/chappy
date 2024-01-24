export interface intUser {
    lastname: string,
    firstname: string,
    email: string,
    address: string,
    zip: number | null,
    city: string,
    phone: number | null,
    password: string,
    checkPassword: string,
}

export interface intCompany {
    name?: string,
    siret?: string,
    description?: string,
}

export interface intRegister {
    userInfos: intUser,
    companyInfos: intCompany,
    companyNameEmployee: string
}