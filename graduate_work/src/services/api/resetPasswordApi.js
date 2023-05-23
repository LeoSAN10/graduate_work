import AxiosInstance from './AxiosInstance'

export const resetPassword = async (password) => {
  try {
    const { data: response } = await AxiosInstance.put('/users/password', {
      password,
    })
    return response
  } catch (error) {
    return error.response.data
  }
}
