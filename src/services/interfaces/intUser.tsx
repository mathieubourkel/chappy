import { intCompany } from "./intCompany"
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
    myOwnTasks: intTasks
    company: intCompany,
    myCompany: intCompany
}


export type intUsers = intUser[]
export type intUsersLight = intUserLight[]
