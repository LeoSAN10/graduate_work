import React from 'react'
import useStyles from './styles'
import { Button, Typography } from '@material-ui/core'
import { Container, InputBase } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useToggle } from 'react-use'
import { ROUTES } from '../../utils/paths'
import { FIELD_NAMES } from '../../utils/fieldNames'
import { emailPatternRule } from '../../utils/validators'
import { setToken } from '../../services/localStorage'
import {
  receiveVerificationCode,
  sendEmail,
} from '../../services/api/loginRequests'

const emailValidator = {
  pattern: emailPatternRule,
  required: 'Email must be filled',
}

const ResetPassword = () => {
  const classes = useStyles()
  const [disableConfirmBtn, setDisableConfirmBtn] = useToggle(true)
  const [invalidEmailMessage, setInvalidEmailMessage] = useToggle(false)
  const [userCheckMessage, setUserCheckMessage] = useToggle(false)
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  const sendCode = async () => {
    setInvalidEmailMessage(false)
    setUserCheckMessage(true)
    const user = await sendEmail(getValues(FIELD_NAMES.email))
    if (user) {
      setUserCheckMessage(false)
      setInvalidEmailMessage(false)
    } else {
      setUserCheckMessage(false)
      setInvalidEmailMessage(true)
    }
  }

  const validateCode = async (codeToValidate: string) => {
    const response = await receiveVerificationCode(
      codeToValidate,
      getValues(FIELD_NAMES.email)
    )
    if (response.resultCode) {
      setToken(response.data.token)
    }
    setDisableConfirmBtn(response.resultCode !== 1)
  }

  const confirmCode = () => {
    if (!disableConfirmBtn) {
    }
  }

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} component="h3">
        Please, enter your email address and we will send you <br />
        the secret code to reset your password
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <InputBase
          required
          className={classes.field}
          placeholder="email address"
          {...register(FIELD_NAMES.email, emailValidator)}
        />
        {invalidEmailMessage && 'User not exist'}
        {userCheckMessage && 'Is loading'}
        <Typography className={classes.error}>
          {errors.email?.message}
        </Typography>

        <Button
          className={classes.btn}
          variant="contained"
          disabled={!isValid}
          onClick={sendCode}
        >
          Send the code
        </Button>

        <InputBase
          required
          className={classes.field}
          placeholder="secret code"
          {...register(FIELD_NAMES.verificationCode, {
            onChange: (e) => validateCode(e.target.value),
          })}
        />
        <Typography className={classes.error}>
          {errors.code?.message}
        </Typography>

        <Button
          className={classes.btn}
          variant="contained"
          onClick={confirmCode}
          disabled={disableConfirmBtn}
        >
          <Link to={ROUTES.createNewPassword} className={classes.link}>
            Confirm
          </Link>
        </Button>

        <Link to={ROUTES.login} className={classes.link}>
          <Button className={classes.backBtn}>Back</Button>
        </Link>
      </form>
    </Container>
  )
}

export default React.memo(ResetPassword)
