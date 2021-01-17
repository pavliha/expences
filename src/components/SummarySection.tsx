import React, { FC } from 'react'
import { SummaryCard } from './SummaryCard'
import { formatCurrency } from '../utils'
import { makeStyles } from '@material-ui/core'
import { getCurrentMonthRemainingDaysCount, getCurrentMonthWeeksCount } from '../utils/datetime'
import { INCOME, SAVINGS } from '../config'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(2)
  }
}))

const remainingDaysCount = getCurrentMonthRemainingDaysCount()
const weeksCount = getCurrentMonthWeeksCount()

interface Props {
  exchangeRate: number
  totalSpent: number
}
export const SummarySection: FC<Props> = ({ exchangeRate, totalSpent }) => {
  const classes = useStyles()

  const leftUSD = INCOME - SAVINGS - totalSpent / exchangeRate
  const leftUAH = INCOME * exchangeRate - SAVINGS * exchangeRate - totalSpent

  return (
    <section className={classes.root}>
      <SummaryCard
        title="Доходы"
        primary={formatCurrency(INCOME * exchangeRate, 'UAH')}
        secondary={formatCurrency(INCOME, 'USD')}
      />
      <SummaryCard
        title="Расходы"
        primary={formatCurrency(totalSpent, 'UAH')}
        secondary={formatCurrency(totalSpent / exchangeRate, 'USD')}
      />
      <SummaryCard
        title="Сбережения"
        primary={formatCurrency(SAVINGS * exchangeRate, 'UAH')}
        secondary={formatCurrency(SAVINGS, 'USD')}
      />
      <SummaryCard
        title="Остаток"
        primary={formatCurrency(leftUAH, 'UAH')}
        secondary={formatCurrency(leftUSD, 'USD')}
      />
      <SummaryCard
        title="Средний расход в неделю"
        primary={formatCurrency(totalSpent / weeksCount, 'UAH')}
        secondary={formatCurrency(totalSpent / weeksCount, 'USD')}
      />
      <SummaryCard
        title="Возможный расход в день"
        primary={formatCurrency(leftUAH / remainingDaysCount, 'UAH')}
        secondary={formatCurrency(leftUSD / remainingDaysCount, 'USD')}
      />
    </section>
  )
}
