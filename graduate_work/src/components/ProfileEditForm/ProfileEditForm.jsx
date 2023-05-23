import React, { useState, memo } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Dialog,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import useStyles from './styles'
import { getValidationScheme as scheme } from './utils'
import { UserProfile } from '../../services/types'
import { profileChangedThunk } from '../../store/reducers/userReducer'
import { useDispatch } from 'react-redux'

const submitBtnName = 'save profile data'
const formName = 'profile changes:'

interface ProfileEditFormProps {
  onClose: () => void
  userData?: UserProfile
  open: boolean
}

export const ProfileEditForm = ({
  onClose,
  open,
  userData,
}: ProfileEditFormProps) => {
  const classes = useStyles()
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UserProfile>({ mode: 'onChange' })

  const onSubmit = async () => {
    if (userData) {
      const userChangedData: UserProfile = {
        name: getValues('name'),
        email: getValues('email'),
        phone: getValues('phone'),
      }
      dispatch(profileChangedThunk(userChangedData))
      setErrorMessage('')
      setSuccessMessage('Congrats! Profile was successfully changed')
      handleClose()
    } else {
      setErrorMessage('Oops, something went wrong while handling :(')
      setSuccessMessage('')
    }
  }

  const handleClose = () => {
    reset()
    return onClose()
  }

  const disable = !isDirty || !isValid

  return (
    <Dialog open={open} onClose={handleClose}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        <Box className={classes.root}>
          <DialogTitle>{formName}</DialogTitle>
          <DialogContent>
            <Box className={classes.input}>
              <Box className={classes.errorBlock}></Box>

              <TextField
                label="name"
                multiline
                rows={1}
                variant="outlined"
                defaultValue={userData?.name}
                {...register('name', scheme.name)}
              />

              <Box className={classes.errorBlock}>
                <Typography className={classes.error}>
                  {errors.name?.message}
                </Typography>
              </Box>

              <TextField
                label="email"
                rows={1}
                variant="outlined"
                defaultValue={userData?.email}
                {...register('email', scheme.email)}
              />

              <Box className={classes.errorBlock}>
                <Typography className={classes.error}>
                  {errors.email?.message}
                </Typography>
              </Box>

              <TextField
                label="phone"
                rows={1}
                variant="outlined"
                defaultValue={userData?.phone}
                {...register('phone', scheme.phone)}
              />

              <Box className={classes.errorBlock}>
                <Typography className={classes.error}>
                  {errors.phone?.message}
                </Typography>
              </Box>
            </Box>

            <Typography className={classes.error}>{errorMessage}</Typography>
            <Typography className={classes.success}>
              {successMessage}
            </Typography>
          </DialogContent>
          <DialogActions className={classes.editProfileBtn}>
            <Button
              disabled={disable}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.editProfileBtn}
            >
              {submitBtnName}
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  )
}

export default memo(ProfileEditForm)
