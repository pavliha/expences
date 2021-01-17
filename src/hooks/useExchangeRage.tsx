import { useEffect, useState } from 'react'
import api, { CurrencyInfo } from '../api'

export const useExchangeRate = (): number | null => {
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>()
  const exchangeRage = currencyInfo?.rateBuy ?? Number(localStorage.getItem('exchangeRage')) ?? 0

  useEffect(() => {
    if (!localStorage.getItem('exchangeRage')) {
      api.currency().then(setCurrencyInfo)
    }
  }, [])

  useEffect(() => {
    if (currencyInfo) {
      localStorage.setItem('exchangeRage', String(currencyInfo?.rateBuy))
    }
  }, [currencyInfo])

  return exchangeRage
}
