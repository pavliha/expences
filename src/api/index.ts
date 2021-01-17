import http from './http'
import { Statement } from './types'

const api = {
  statements(): Promise<Statement[]> {
    return http.get('/personal/statement/Q9sJH63Mq0jvSR_qy2dp4A/1609526072/1610908560')
  }
}

export default api

export * from './types'
