import { ChangeEvent } from "react"

export interface intProject {
    name: string,
    description: string,
    budget: number,
    owner: string,
    id: number,
    status: string
}

export interface intStep {
    name: string,
    description: string,
    budget: number,
    startDate: string,
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
}

export type intUsers = Array<string>
export type intTasks = Array<intTask>
export type intSteps = Array<intStep>
export type intComments = Array<intComment>
export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;