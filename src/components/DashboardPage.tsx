import React, { FC, useState } from 'react'
import { makeStyles, Tab, Tabs } from '@material-ui/core'
import { StatementsList } from './StatementsList'
import { SummarySection } from './SummarySection'
import { ExpensesList } from './ExpensesList'
import { useExchangeRate, useStatements } from '../hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  dashboard: {
    padding: theme.spacing(2)
  },
  expensesList: {
    marginTop: theme.spacing(2)
  },
  tabsSection: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      maxWidth: 500
    }
  }
}))

export const DashboardPage: FC = () => {
  const classes = useStyles()
  const exchangeRate = useExchangeRate()
  const statements = useStatements()
  const [tab, setTab] = useState('statements')

  return (
    <main className={classes.root}>
      <div className={classes.tabsSection}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab label="Выписки" value="statements" />
          <Tab label="Расходы" value="expenses" />
        </Tabs>
        {tab === 'statements' && <StatementsList items={statements} />}
        {tab === 'expenses' && <ExpensesList className={classes.expensesList} items={statements} />}
      </div>
      <div className={classes.dashboard}>
        <SummarySection
          exchangeRate={exchangeRate ?? 0}
          totalSpent={statements.reduce((acc, stmt) => acc + stmt.amount, 0)}
        />
      </div>
    </main>
  )
}
