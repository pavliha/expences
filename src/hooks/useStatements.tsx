import { useEffect, useState } from 'react'
import api, { Statement } from '../api'

export const useStatements = (): Statement[] => {
  const [statements, setStatements] = useState<Statement[]>([])

  useEffect(() => {
    api.statements().then(setStatements)
  }, [])

  return statements
}
