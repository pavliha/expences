import React, { FC } from 'react'
import { SummaryCard } from './SummaryCard'
import { formatCurrency } from '../utils'
import { makeStyles } from '@material-ui/core'
import { getCurrentMonthRemainingDaysCount, getCurrentMonthWeeksCount } from '../utils/datetime'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridAutoFlow: 'column'
    }
  }
}))

const remainingDaysCount = getCurrentMonthRemainingDaysCount()
const weeksCount = getCurrentMonthWeeksCount()

interface Props {
  income: number
  savings: number
  exchangeRate: number
  totalSpent: number
}
export const SummarySection: FC<Props> = ({ exchangeRate, income, savings, totalSpent }) => {
  const classes = useStyles()

  const leftUSD = income / exchangeRate - savings / exchangeRate - totalSpent / exchangeRate
  const leftUAH = income - savings - totalSpent

  return (
    <section className={classes.root}>
      <SummaryCard
        title="Доходы"
        primary={formatCurrency(income, 'UAH')}
        secondary={formatCurrency(income / exchangeRate, 'USD')}
      />
      <SummaryCard
        title="Расходы"
        primary={formatCurrency(totalSpent, 'UAH')}
        secondary={formatCurrency(totalSpent / exchangeRate, 'USD')}
      />
      <SummaryCard
        title="Сбережения"
        primary={formatCurrency(savings, 'UAH')}
        secondary={formatCurrency(savings / exchangeRate, 'USD')}
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
