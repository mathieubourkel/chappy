import { intUserLight } from "./intUser"

export interface intCompany {
    name: string
    siret: string,
    description: string,
    user?: intUserLight
    id?: number
}

export interface intLightCompany {
    id:number
}

export type intCompanies = intCompany[]
export type intLightCompanies = intLightCompany[]
