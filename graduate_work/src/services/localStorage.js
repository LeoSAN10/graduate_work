export const setToken = (tokenValue) => {
  localStorage.setItem('token', tokenValue)
}

export const setUserStatus = (statusValue) => {
  localStorage.setItem('isBlocked', statusValue)
}

export const getUserStatus = () => {
  return JSON.parse(localStorage.getItem('isBlocked'))
}

export const getToken = () => {
  return localStorage.getItem('token')?.toString()
}
