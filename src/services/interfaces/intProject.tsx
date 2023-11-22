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
    id: number,
    budget: number,
    startTime: Date,
    endTime: Date
}

export interface intComment {
    name: string,
    content: string,
    id: number
    author: string
}

// export type intSteps = Array<intStep>
export type intComments = Array<intComment>