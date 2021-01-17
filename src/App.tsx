import React, { FC, useEffect, useState } from 'react'
import { StatementsList, SummaryCard } from './components'
import api, { Statement } from './api'
import { CssBaseline, makeStyles } from '@material-ui/core'
import { useExchangeRate } from './hooks'
import { formatCurrency } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  section: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2)
  }
}))

const INCOME = 250000
const SAVINGS = 100000

const App: FC = () => {
  const classes = useStyles()
  const [statements, setStatements] = useState<Statement[]>([])
  const exchangeRate = useExchangeRate()

  useEffect(() => {
    api.statements().then(setStatements)
  }, [])

  const totalSpent = statements.reduce((acc, stmt) => acc + stmt.amount, 0)

  return (
    <>
      <CssBaseline />
      <main className={classes.root}>
        <StatementsList items={statements} />
        <section className={classes.section}>
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
      </main>
    </>
  )
}

export default App
