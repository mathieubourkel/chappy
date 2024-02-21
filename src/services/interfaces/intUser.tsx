import { intCompanies, intCompany } from "./intCompany"
import { intProjects } from "./intProject"
import { intTasks } from "./intTask"

export interface intUser extends intUserLight {
    lastname: string,
    firstname: string,
    email: string,
    address: string,
    zip: string,
    city: string,
    phone: string,
    password?: string,
    checkPassword?: string
    status:number
}


export interface intUserLight {
    firstname?: string,
    lastname?: string,
    company?: intCompany,
    email?: string,
    id?: number
    tasks?:intTasks
}


export interface intProfileUser extends intUser {
    projects: intProjects
    participations: intProjects
    myOwnTasks: intTasks,
    myOwnGroups: intCompanies,
    demands:intDemands
}

export interface intDemand {
    id?: number,
    group: intCompany,
    user?:intUser
    status:number
}

export type intDemands = intDemand[]
export type intUsers = intUser[]
export type intUsersLight = intUserLight[]
