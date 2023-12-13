import { ChangeEvent } from "react"

export interface intProject extends intProjectLight {
    description: string,
    budget?: number,
    status: number
    project_steps: intSteps
    estimEndDate: Date | null
    user: intUserLight
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

export interface intProjectLight {
    id?:number | string | string | undefined
    name?:string
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
}

export type intSelect = {
    value: number | null | string
    label: string | undefined
  };

export interface intComment {
    content: string,
    author: string
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
}

export interface intUserLight {
    firstName?: string,
    lastName?: string,
    company?: string,
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

export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;