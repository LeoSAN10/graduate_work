import React from 'react'
import useSelector from '../../hooks/useSelector'
import { getTextAvatar } from '../../utils/avatar'
import { Avatar } from '@mui/material'
import {
  getUserName,
  getProfileColor,
} from '../../store/selectors/userSelector'

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const UserAvatar = ({ onClick }: Props) => {
  const userName = useSelector(getUserName)
  const profileColor = useSelector(getProfileColor)
  return (
    <Avatar onClick={onClick} style={{ backgroundColor: profileColor }}>
      {getTextAvatar(userName)}
    </Avatar>
  )
}

export default React.memo(UserAvatar)
