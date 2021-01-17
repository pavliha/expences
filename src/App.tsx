import React, { FC, useEffect, useState } from 'react'
import { StatementsList, SummarySection } from './components'
import api, { Statement } from './api'
import { CssBaseline, makeStyles } from '@material-ui/core'
import { useExchangeRate } from './hooks'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
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
        <SummarySection
          exchangeRate={exchangeRate}
          totalSpent={statements.reduce((acc, stmt) => acc + stmt.amount, 0)}
        />
      </main>
    </>
  )
}

export default App
