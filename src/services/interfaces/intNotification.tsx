export interface intNotification {
    _id?: string
    model: {refModel:number, refId: string}
    message: string
    status: number
    createdAt?: Date
    content: string
}

export type intNotifications = intNotification[]


