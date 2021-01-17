import React, { FC } from 'react'
import { DashboardPage } from './components'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

const App: FC = () => {
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  )
}

export default App
