import React from 'react'
import { useToggle } from 'react-use'
import Layout from '../../Components/Layout'
import { Box, Button, Typography } from '@material-ui/core'
import useStyles from './styles'
import useSelector from '../../hooks/useSelector'
import { getUserData } from '../../store/selectors/userSelector'
import { ProfileEditForm } from '../../Components/ProfileEditForm'

const EDIT_BTN_LABEL = 'Edit profile'

const ProfilePage = () => {
  const classes = useStyles()
  const [editForm, setEditForm] = useToggle(false)
  const user = useSelector(getUserData)

  return (
    <Layout>
      <Box className={classes.container}>
        <Box>
          <Typography className={classes.header}>Account</Typography>
        </Box>

        <Box className={classes.userInfoBlock}>
          <Box className={classes.accountDataBlock}>
            <Typography className={classes.accountData}>Username:</Typography>
          </Box>
          <Box className={classes.userDataBlock}>
            <Typography className={classes.userData}>{user.name}</Typography>
          </Box>
        </Box>

        <Box className={classes.userInfoBlock}>
          <Box className={classes.accountDataBlock}>
            <Typography className={classes.accountData}>Email:</Typography>
          </Box>
          <Box className={classes.userDataBlock}>
            <Typography className={classes.userData}>{user.email}</Typography>
          </Box>
        </Box>

        <Box className={classes.userInfoBlock}>
          <Box className={classes.accountDataBlock}>
            <Typography className={classes.accountData}>Phone:</Typography>
          </Box>
          <Box className={classes.userDataBlock}>
            <Typography className={classes.userData}>{user.phone}</Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          className={classes.editBtn}
          onClick={setEditForm}
        >
          {EDIT_BTN_LABEL}
        </Button>
      </Box>
      <ProfileEditForm open={editForm} onClose={setEditForm} userData={user} />
    </Layout>
  )
}

export default React.memo(ProfilePage)
