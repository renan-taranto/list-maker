import axios from 'axios'
import store from '@/store'

export default () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use((config) => {
    store.dispatch('app/loadingStarted')
    return config
  }, (error) => {
    store.dispatch('app/loadingEnded')
    store.dispatch('app/showError', 'An error has occurred while sending the request to the API.')
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response) => {
    store.dispatch('app/loadingEnded')
    return response
  }, (error) => {
    if (error.response.status >= 500) {
      store.dispatch('app/loadingEnded')
      store.dispatch('app/showError', 'An error has occurred. Please try again later.')
    }
    return Promise.reject(error)
  })

  return instance
}
