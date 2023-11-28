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
    price: number
  }

export interface intDocument {
    name: string,
    type: string
}

export interface intMember {
    name: string,
    company: string,
    tasks: number
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