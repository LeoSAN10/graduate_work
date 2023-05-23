import React, { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { logOutThunk } from '../../store/reducers/userReducer'
import { useDispatch } from 'react-redux'
import { UserAvatar } from '../UserAvatar'

export const MenuUser = () => {
  const classes = useStyles()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)

  const dispatch = useDispatch()

  const handleClick = useCallback((event) => {
    setAnchor(event.currentTarget)
    setIsOpenMenu(true)
  }, [])
  const handleClose = useCallback(() => {
    setAnchor(null)
    setIsOpenMenu(false)
  }, [])

  const logOut = () => {
    dispatch(logOutThunk())
  }

  const links = [
    {
      to: '/profile',
      text: 'Profile',
      id: 0,
      handler() {
        handleClose()
      },
    },
    {
      to: '/',
      text: 'Log Out',
      id: 2,
      handler() {
        logOut()
        handleClose()
      },
    },
  ]

  const renderUserMenu = links.map((link) => (
    <NavLink to={link.to} className={classes.link} key={link.id}>
      <MenuItem onClick={link.handler}>{link.text}</MenuItem>
    </NavLink>
  ))

  return (
    <Box>
      <UserAvatar onClick={handleClick} />
      <Menu
        anchorEl={anchor}
        open={isOpenMenu}
        onClose={handleClose}
        onClick={handleClose}
      >
        {renderUserMenu}
      </Menu>
    </Box>
  )
}

export default React.memo(MenuUser)
