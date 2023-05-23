import AxiosInstance from './AxiosInstance'
import { UserProfile } from '../types'

export const changeProfile = async (userChangedData) => {
  try {
    const { data: response } = await AxiosInstance.put(
      'users/profile',
      userChangedData
    )
    return response
  } catch (e) {
    return e
  }
}
