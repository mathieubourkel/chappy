import { ChangeEvent } from "react"

export interface intProject extends intProjectLight {
    description: string,
    budget: number,
    owner: string,
    status: number,
    project_steps: intSteps
    estimEndDate: Date | null
}

export interface intProjectLight {
    id:number,
    name:string
  }

export interface intStep {
    name: string,
    description: string,
    budget: number,
    id: number
    estimEndDate: Date | null
    status:number
}

export interface intComment {
    content: string,
    author: string
}

export interface intTask {
    name: string,
    status: number,
    category: intCategory,
    description: string,
    rangeDate: intRangeDate,
    comments: Array<string>,
    app_users: intUsers,
    id?:number
}
export interface intPurchase {
    name: string,
    price: number,
    ref: string,
    commandDate: Date,
    deliveryDate: Date,
    status: number,
    id:number,
    project: {id:string | undefined}
  }

export interface intDocument {
    path: string,
    type: string,
    id:number,
    project: {id:string | undefined}
}

export interface intMember {
    firstName: string,
    email: string,
    lastName: string,
    id: number,
    city:string,
    address: string,
    zip: number,
    status:string
}

export interface intUser {
    name: string,
    company: string,
    email: string
}

export interface intCategory {
    name: string,
    id?: number
}
export interface intRangeDate {
    startDate: Date,
    endDate: Date
}

export type intCategories = Array<intCategory>
export type intStatus = Array<string>
export type intProjects = Array<intProject>
export type intMembers = Array<intMember>
export type intDocuments = Array<intDocument>
export type intPurchases = Array<intPurchase>
export type intUsers = Array<intUser>
export type intTasks = Array<intTask>
export type intSteps = Array<intStep>
export type intComments = Array<intComment>
export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;