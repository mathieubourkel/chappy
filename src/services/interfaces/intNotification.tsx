export interface intNotification {
    _id: string
    content: string
    receivers: number[]
    isView:boolean
    sendDate: string
    path: string
}

export type intNotifications = intNotification[]


