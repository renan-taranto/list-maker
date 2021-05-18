import axios from 'axios'
import store from '@/store/index'

export default () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use((config) => {
    store.dispatch('layout/loadingStarted')
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use((config) => {
    store.dispatch('layout/loadingEnded')
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  return instance
}
