import { intComments } from "./intComment"
import { intUserLight, intUsersLight } from "./intUser"

export interface intTask {
    _id?: string
    name: string,
    status: number
    category: number
    budget: number
    description: string,
    startDate: string,
    endDate:string,
    comments?: intComments
    owner?: intUserLight
    members?: intUsersLight
    step?: string
    project?: string
}

export type intTasks = intTask[]