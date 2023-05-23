import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Container, InputBase, Typography } from '@material-ui/core'
import useStyles from './styles'
import { FIELD_NAMES } from '../../utils/fieldNames'
import { Redirect } from 'react-router-dom'
import { ROUTES } from '../../utils/paths'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordThunk } from '../../store/reducers/resetPasswordReducer'
import {
  maxLengthRule,
  minLengthRule,
  passwordPatternRule,
} from '../../utils/validators'

const passwordValidationScheme = {
  password: {
    maxLength: maxLengthRule,
    minLength: minLengthRule,
    pattern: passwordPatternRule,
    required: 'Password must be filled',
  },
}

const CreateNewPassword = () => {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()
  const isReset = useSelector((state) => state.resetPassword.isReset)

  const onSubmit = async () => {
    dispatch(resetPasswordThunk(getValues(FIELD_NAMES.password)))
  }

  if (isReset) {
    return <Redirect to={ROUTES.login} />
  }

  return (
    <Container maxWidth="sm">
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography className={classes.text} variant="h4" component="h4">
          Create new password
        </Typography>

        <InputBase
          required
          type="password"
          placeholder="New password"
          className={classes.field}
          {...register(FIELD_NAMES.password, {
            ...passwordValidationScheme.password,
          })}
        />

        <p className={classes.error}>
          {errors.password && errors.password.message}
        </p>

        <InputBase
          required
          type="password"
          placeholder="Repeat new password"
          className={classes.field}
          {...register(FIELD_NAMES.confirmPassword, {
            validate: (value) =>
              value === getValues(FIELD_NAMES.password) ||
              'The passwords do not match',
          })}
        />
        {errors.confirmPassword && errors.confirmPassword.message}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          className={classes.confirmBtn}
        >
          Confirm
        </Button>
      </form>
    </Container>
  )
}
export default CreateNewPassword
