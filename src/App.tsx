import React, { FC, useEffect, useState } from 'react'
import { ExpensesList, StatementsList, SummarySection } from './components'
import api, { Statement } from './api'
import { CssBaseline, makeStyles } from '@material-ui/core'
import { useExchangeRate } from './hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  dashboard: {
    padding: theme.spacing(2)
  },
  expensesList: {
    marginTop: theme.spacing(2)
  }
}))

const App: FC = () => {
  const classes = useStyles()
  const [statements, setStatements] = useState<Statement[]>([])
  const exchangeRate = useExchangeRate()

  useEffect(() => {
    api.statements().then(setStatements)
  }, [])

  return (
    <>
      <CssBaseline />
      <main className={classes.root}>
        <StatementsList items={statements} />
        <div className={classes.dashboard}>
          <SummarySection
            exchangeRate={exchangeRate ?? 0}
            totalSpent={statements.reduce((acc, stmt) => acc + stmt.amount, 0)}
          />
          <ExpensesList className={classes.expensesList} items={statements} />
        </div>
      </main>
    </>
  )
}

export default App
