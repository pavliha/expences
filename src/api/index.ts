import http from './http'
import { CurrencyInfo, Statement } from './types'

const getUnixFromDate = (date: Date): number => parseInt((date.getTime() / 1000).toFixed(0))

const api = {
  async currency(): Promise<CurrencyInfo | undefined> {
    const currencies = await http.get<unknown, CurrencyInfo[]>('/bank/currency')
    return currencies?.find((item) => item.currencyCodeB === 980)
  },
  statements(): Promise<Statement[]> {
    const currentDate = new Date()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const from = getUnixFromDate(firstDayOfMonth)
    const to = getUnixFromDate(currentDate)
    return http.get(`/personal/statement/Q9sJH63Mq0jvSR_qy2dp4A/${from}/${to}`)
  }
}

export default api

export * from './types'
