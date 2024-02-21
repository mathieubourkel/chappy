import { intDemands, intUserLight } from "./intUser"

export interface intCompany extends intLightCompany {
    name: string
    description: string,
    additionalInfos?: string,
    user?: intUserLight
    demands?:intDemands
}

export interface intLightCompany {
    id?:number
}

export type intCompanies = intCompany[]
export type intLightCompanies = intLightCompany[]
