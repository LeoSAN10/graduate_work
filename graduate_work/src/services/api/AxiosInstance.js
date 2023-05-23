import axios from 'axios'
import { getToken, setUserStatus } from '../localStorage'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 5000,
  responseType: 'json',
})

AxiosInstance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token.replaceAll(`"`, '')}`,
    }
  }
  return config
})

AxiosInstance.interceptors.request.use(
  (confiq) => confiq,
  (error) => Promise.reject(error)
)

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      setUserStatus('true')
    }
    return Promise.reject(error)
  }
)

export default AxiosInstance
