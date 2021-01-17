import { setup } from 'axios-cache-adapter'

const http = setup({
  // `axios` options
  baseURL: `${process.env.REACT_APP_MONOBANK_API}`,
  timeout: 25000,

  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

http.interceptors.request.use(async (config) => {
  config.headers['X-Token'] = localStorage.getItem('MonoBank-token') ?? process.env.REACT_APP_MONOBANK_TOKEN
  return config
})

http.interceptors.response.use((response) => response.data)

export default http
