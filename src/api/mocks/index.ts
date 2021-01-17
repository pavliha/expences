import axiosMockAdapter from 'axios-mock-adapter'
import http from '../http'
import registerStatements from './statements'

// This sets the mock adapter on the default instance
const mock = new axiosMockAdapter(http, { delayResponse: 500 })

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    console.info('Http: Requesting with config: ', config)
    return config
  },
  (error) => {
    console.warn('Http: Request rejected with error: ', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx
    console.info('Http: Responding: ', response)
    return response
  },
  (error) => {
    console.warn('Http: Response rejected with error: ', error)
    return Promise.reject(error)
  }
)

registerStatements(mock)
// mock.onAny().passThrough() // Anything that wasn't matched above will be passed through
