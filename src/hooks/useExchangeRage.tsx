import { useEffect, useState } from 'react'
import api, { CurrencyInfo } from '../api'

export const useExchangeRate = (): number | null => {
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>(null)
  const exchangeRage = currencyInfo?.rateBuy ?? Number(localStorage.getItem('exchangeRage')) ?? 0

  useEffect(() => {
    api.currency().then(setCurrencyInfo)
  }, [])

  useEffect(() => {
    localStorage.setItem('exchangeRage', String(currencyInfo?.rateBuy ?? 0))
  }, [currencyInfo])

  return exchangeRage
}
