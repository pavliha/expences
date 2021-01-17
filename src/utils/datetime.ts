import moment from 'moment'

export function getCurrentMonthRemainingDaysCount(): number {
  const d = moment()
  const currentDay = d.get('date')
  const daysInMonth = d.daysInMonth()
  return daysInMonth - currentDay
}
/**
 * Returns count of weeks for year and month
 *
 * @param {Number} year - full year (2016)
 * @param {Number} month_number - month_number is in the range 1..12
 * @returns {number}
 */
const weeksCount = function (year: number, month_number: number): number {
  const firstOfMonth = new Date(year, month_number - 1, 1)
  let day = firstOfMonth.getDay() || 6
  day = day === 1 ? 0 : day
  if (day) {
    day--
  }
  let diff = 7 - day
  const lastOfMonth = new Date(year, month_number, 0)
  const lastDate = lastOfMonth.getDate()
  if (lastOfMonth.getDay() === 1) {
    diff--
  }
  const result = Math.ceil((lastDate - diff) / 7)
  return result + 1
}

export function getCurrentMonthWeeksCount(): number {
  const d = moment()
  return weeksCount(d.get('year'), d.get('month'))
}
