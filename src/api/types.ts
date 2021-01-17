export type Statement = {
  id: string
  time: number
  description: string
  mcc: number
  hold: boolean
  amount: number
  operationAmount: number
  currencyCode: number
  commissionRate: number
  cashbackAmount: number
  balance: number
}

export type CurrencyInfo = {
  currencyCodeA: number
  currencyCodeB: number
  date: number
  rateSell: number
  rateBuy: number
  rateCross?: number
}
