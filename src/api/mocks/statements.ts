import MockAdapter from 'axios-mock-adapter'
import statements from './statements.json'

const registerStatements = (mock: MockAdapter): void => {
  mock.onGet(/\/personal\/statement\/.*/).reply(() => {
    return [200, statements]
  })
}

export default registerStatements
