import type { ResponseType } from './types'

export const registrate = () => {
  const response = {
    resultCode: 200,
    data: {
      message: 'The user is already exist',
      isExist: true,
    },
  }
  return new Promise<ResponseType>((res) =>
    setTimeout(() => res(response), 5000)
  )
}
