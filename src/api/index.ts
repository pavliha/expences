import http from './http'
import { Statement } from './types'

const api = {
  statements(): Promise<Statement[]> {
    return http.get('/personal/statement/Q9sJH63Mq0jvSR_qy2dp4A/1610292974/1610897774')
  }
}

export default api

export * from './types'
