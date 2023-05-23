import AxiosInstance from './AxiosInstance'
import { RequestForm } from '../../Components/RequestForm/RequestForm'

export const getRequest = async (requestId) => {
  const response = await AxiosInstance.get<Request>(`/requests/:${requestId}`)
  return response.data
}

export const createRequest = async (request) => {
  try {
    const response = await AxiosInstance.post('/requests', request)
    return response.data
  } catch (e) {
    return e
  }
}
export const updateRequest = async (
  request,
  id
) => {
  try {
    const response = await AxiosInstance.put(`/requests/:${id}`, request)
    return response.data
  } catch (e) {
    return e
  }
}
