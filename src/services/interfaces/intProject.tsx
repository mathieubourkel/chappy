import { intCompanies } from "./intCompany"
import { intSteps } from "./intStep"
import { intUserLight } from "./intUser"

export interface intProjectLight {
    _id?:string
    name?:string
    owner?: intUserLight
    code?:string
    members?: []
  }

export interface intProject extends intProjectLight {
    description: string,
    budget: number,
    status: number
    steps: intSteps
    estimEndDate: string
    companies: intCompanies
}

export type intProjects = intProject[]
export type intProjectsLight = intProjectLight[]