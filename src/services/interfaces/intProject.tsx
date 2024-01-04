import { ChangeEvent } from "react"

export interface intProject extends intProjectLight {
    description: string,
    budget?: number,
    status: number
    project_steps: intSteps
    estimEndDate: Date | null
    owner: intUserLight
    users?: intUsersLight
    companies?: intCompanies
}

export interface intCompany {
    name?: string
    siret?: number,
    description?: string,
    user?: intUserLight
    id: number | null | string
}

export interface intNotification {
    content: string
    id: number | null | string
    sender: intUserLight
    receivers: intUsers
    isView:boolean
    timestamp: number
    path: string
}

export interface intProjectLight {
    id?:number | string | string | undefined
    name?:string
    code:string
  }

  export interface intStepLight {
    id?:number | string | string | undefined
    name?:string
  }

export interface intStep extends intStepLight{
    description: string,
    budget: number,
    estimEndDate: Date | null
    status:number
    project: {id:string|undefined, name:string|undefined}
    step_tasks : intTasks
}

export type intSelect = {
    value: number | null | string
    label: string | undefined
  };

export interface intComment {
    content: string,
    table: string,
    idParent: string | undefined
    id?: number
    author: intUserLight
}

export interface intTask {
    name: string,
    status: number
    category: intCategory,
    description: string,
    startDate: Date,
    endDate:Date,
    comments?: intComments
    user?: intUserLight
    users: intUsersLight
    id?:number
    project_step?: intStepLight
}

export interface intPurchase {
    name: string,
    price: number,
    ref?: string,
    commandDate?: Date,
    deliveryDate?: Date,
    status?: number,
    id?:number,
    project: intProjectLight
  }

export interface intDocument {
    path: string,
    type: string,
    id?:number,
    project: intProjectLight
}

export interface intUser extends intUserLight {
    city:string,
    address: string,
    zip: number,
    status:number
    phone:string
}

export interface intProfileUser extends intUser {
    projects: intProjects
    projects_collab: intProjects
    companies: intCompanies
}

export interface intUserLight {
    firstName?: string,
    lastName?: string,
    company?: intCompany,
    email?: string,
    id: number | null | string
}

export interface intCategory {
    name: string | undefined
    id: number
}
export interface intRangeDate {
    startDate: Date,
    endDate: Date
}

export type intCategories = intCategory[]
export type intStatus = string[]
export type intProjects = intProject[]
export type intProjectsLight = intProjectLight[]
export type intStepsLight = intStepLight[]
export type intUsers = intUser[]
export type intUsersLight = intUserLight[]
export type intDocuments = intDocument[]
export type intPurchases = intPurchase[]
export type intTasks = intTask[]
export type intSteps = intStep[]
export type intComments = intComment[]
export type intCompanies = intCompany[]
export type intNotifications = intNotification[]

export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;