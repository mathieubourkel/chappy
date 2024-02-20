export interface intPurchase {
    _id:string,
    refId: string
    refModel: number
    description: string,
    price: {devise: number, fullTaxPrice:number},
    status: number,
    commandDate: string,
    deliveryDate: string
  }

  export type intPurchases = intPurchase[]
