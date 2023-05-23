export const getTextAvatar = (userName) => {
  return userName.slice(0, 2).toUpperCase()
}

export const generateProfileColor = () => {
  const shade = Math.round(Math.random() * 100)
  return `#fe4c${shade}`
}
