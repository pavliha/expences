import React, { FC, useEffect, useState } from 'react'
import { StatementsList } from './components'
import api, { Statement } from './api'

const App: FC = () => {
  const [statements, setStatements] = useState<Statement[]>([])

  useEffect(() => {
    api.statements().then(setStatements)
  }, [])

  return (
    <main>
      <StatementsList items={statements} />
    </main>
  )
}

export default App
