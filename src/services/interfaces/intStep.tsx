import { intProjectLight } from "./intProject"
import { intTasks } from "./intTask"


export interface intStepLight {
    _id?:number | string | undefined
    name?:string
  }

  export interface intStep extends intStepLight{
    description: string,
    budget: number,
    estimEndDate: string
    status:number
    project: intProjectLight
    tasks : intTasks
}

export type intSteps = intStep[]
export type intStepsLight = intStepLight[]
