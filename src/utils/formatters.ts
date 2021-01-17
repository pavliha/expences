const formatWithCommas = (number: number): string => number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const formatNumber = (number: number): string => {
  return formatWithCommas(number * 0.01)
}

export const formatCurrency = (number: number, currency: string): string => {
  return `${formatWithCommas(number * 0.01)} ${currency}`
}
