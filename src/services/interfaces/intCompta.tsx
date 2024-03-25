export interface intCompta {
    _id?:string,
    refId: string
    refModel: number
    description: string,
    price: number,
    status: number,
    commandDate: string,
    deliveryDate: string
  }

  export type intComptas = intCompta[]
