/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react"

export interface intProject extends intProjectLight {
    description: string,
    budget?: number,
    status: number
    steps?: intSteps
    estimEndDate: string
    owner: intOwner
    users?: intUser[]
    companies?: intCompanies
}

export interface intProjectDash extends intProjectLight {
    description: string,
    budget?: number,
    status: number
    steps: intSteps
    estimEndDate: Date | null
    owner: intOwner
    users?: intUser[]
    companies?: intCompanies
}

export interface intOwner {
    id: number,
    firstname?: string,
    lastname?: string,
    email?: string
}

export interface intCompany {
    name?: string
    siret?: string,
    description?: string,
    user?: intUserLight
    id: number | null | string
}

export interface intNotification {
    content: string
    id: number
    receivers: number[]
    isView:boolean
    sendDate: string
    path: string
}

export interface intProjectLight {
    id?:number | string | undefined
    name?:string
    owner?: intOwner,
    code:string
    users?: intUserLight[]
  }

  export interface intStepLight {
    id?:number | string | undefined
    name?:string
  }

export interface intStep extends intStepLight{
    description: string,
    budget: number,
    estimEndDate: string
    status:number
    project: number
    tasks : intTasks
}

export interface intStepNew extends intStepLight{
    description: string,
    budget: number,
    estimEndDate: Date | null
    status:number
    project: {id: number, name:string, owner: {id: number}, users: []}
    tasks : intTasks
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
    category: number
    description: string,
    startDate: string,
    endDate:string,
    comments?: intComments
    owner?: {id: number}
    users: Array<number | string | null>
    id?:number
    step?:number | string |undefined
    project?:number
    budget:number
}

export interface intTaskRelou {
    budget: number
    name: string,
    status: number
    category: number
    description: string,
    startDate: string,
    endDate:string,
    comments?: intComments
    owner?: {id: number}
    users: any
    id?:number
    step?:number | string |undefined
    project?:number
}

export interface intPurchase {
    name: string,
    price: number,
    ref: string,
    commandDate: string,
    deliveryDate: string,
    status: number,
    id:number,
    project: intProjectLight | number
  }

export interface intDocument {
    path: string,
    type: number,
    id:number,
    project: intProjectLight | number
}

export type intSelectDocument = {
    value: number | null | string
    label: string | undefined
};

export interface intUser extends intUserLight {
    city:string,
    address: string,
    zip: number,
    status:number,
    phone:string,
    
}

export interface intProfileUser extends intUser {
    projects: intProjects
    participations: intProjects
    myOwnTasks: intTasks
    company: intCompany,
    myCompany: intCompany
}

export interface intUserLight {
    firstname?: string,
    lastname?: string,
    company?: intCompany,
    email?: string,
    id: number | null | string
    tasks?:intTasks
}

export interface intRangeDate {
    startDate: Date,
    endDate: Date
}

export type intStatus = string[]
export type intProjects = intProject[]
export type intProjectsDash = intProjectDash[]
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