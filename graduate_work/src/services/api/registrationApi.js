import AxiosInstance from './AxiosInstance'

export const registerUser = async (
  name,
  phone,
  email,
  password,
  profileColor
) => {
  try {
    profileColor = profileColor ?? 'C0C0C0'
    const { data: response } = await AxiosInstance.post('/users', {
      name,
      phone,
      email,
      password,
      profileColor,
    })
    return response
  } catch (error) {
    return error?.response?.data
  }
}
