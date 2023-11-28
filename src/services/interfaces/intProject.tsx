import { ChangeEvent } from "react"

export interface intProject {
    name: string,
    description: string,
    budget: number,
    owner: string,
    status: number
}

export interface intStep {
    name: string,
    description: string,
    budget: number,
    id: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    startDate: any
}

export interface intComment {
    content: string,
    author: string
}

export interface intTask {
    name: string,
    status: string,
    categorie: string,
    description: string,
    startDate: string,
    endDate: string
    comments: Array<string>
    users: Array<string>
}
export interface intPurchase {
    name: string,
    price: number,
    ref: string,
    commandDate: Date,
    deliveryDate: Date,
    status: number
  }

export interface intDocument {
    path: string,
    type: string,
    id: number
}

export interface intMember {
    firstName: string,
    company: string,
    email: string,
    lastName: string,
    address: string,
    status: number,
    city: string,
    zip: number,
    id: number,
    phone: string
}

export interface intUser {
    name: string,
    company: string
}
export type intProjects = Array<intProject>
export type intMembers = Array<intMember>
export type intDocuments = Array<intDocument>
export type intPurchases = Array<intPurchase>
export type intUsers = Array<string>
export type intTasks = Array<intTask>
export type intSteps = Array<intStep>
export type intComments = Array<intComment>
export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;