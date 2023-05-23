export const checkIsAuth = () => {
  return JSON.parse(localStorage.getItem('token'))
}
