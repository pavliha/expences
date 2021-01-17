import React, { FC } from 'react'
import { SummaryCard } from './SummaryCard'
import { formatCurrency } from '../utils'
import { makeStyles } from '@material-ui/core'

const INCOME = 250000
const SAVINGS = 100000

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2)
  }
}))

interface Props {
  exchangeRate: number
  totalSpent: number
}
export const SummarySection: FC<Props> = ({ exchangeRate, totalSpent }) => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      <SummaryCard
        title="Доходы"
        primary={formatCurrency(INCOME, 'USD')}
        secondary={formatCurrency(INCOME * exchangeRate, 'UAH')}
      />
      <SummaryCard
        title="Расходы"
        primary={formatCurrency(totalSpent / exchangeRate, 'USD')}
        secondary={formatCurrency(totalSpent, 'UAH')}
      />
      <SummaryCard
        title="Сбережения"
        primary={formatCurrency(SAVINGS, 'USD')}
        secondary={formatCurrency(SAVINGS * exchangeRate, 'UAH')}
      />
      <SummaryCard
        title="Остаток"
        primary={formatCurrency(INCOME - SAVINGS - totalSpent / exchangeRate, 'USD')}
        secondary={formatCurrency(INCOME * exchangeRate - SAVINGS * exchangeRate - totalSpent, 'UAH')}
      />
    </section>
  )
}
