import { Link, Redirect } from 'react-router-dom'
import { Button, Container, InputBase } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { getValidationScheme } from './utils'
import { registrationThunk } from '../../store/reducers/userReducer'
import { FIELD_NAMES } from '../../utils/fieldNames'
import { ROUTES } from '../../utils/paths'
import {
  getLoggedIn,
  getLoginError,
  getLoginErrorMessage,
} from '../../store/selectors/userSelector'
import { generateProfileColor } from '../../utils/avatar'

const scheme = getValidationScheme

const RegisterPage = () => {
  const classes = useStyles()

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()
  const loginError = useSelector(getLoginError)
  const isAuth = useSelector(getLoggedIn)
  const message = useSelector(getLoginErrorMessage)

  const onSubmit = () => {
    const profileColor = generateProfileColor()
    dispatch(
      registrationThunk(
        getValues(FIELD_NAMES.name),
        getValues(FIELD_NAMES.phone),
        getValues(FIELD_NAMES.email),
        getValues(FIELD_NAMES.password),
        profileColor
      )
    )
  }

  if (isAuth) {
    return <Redirect to={ROUTES.mainPage} />
  }

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.root}>
          <div className={classes.registerBlock}>
            <div>
              <h1 className={classes.title}>Create new profile</h1>
            </div>

            <InputBase
              required
              placeholder="Name"
              error={!!errors.name?.message}
              fullWidth
              className={classes.field}
              {...register('name', scheme.name)}
            />
            <p className={classes.error}>{errors.name?.message}</p>

            <InputBase
              required
              placeholder="Phone"
              error={!!errors.phone?.message}
              fullWidth
              className={classes.field}
              {...register('phone', scheme.phone)}
            />
            <p className={classes.error}>{errors.phone?.message}</p>

            <InputBase
              required
              placeholder="Email"
              error={!!errors.email?.message}
              fullWidth
              className={classes.field}
              {...register('email', scheme.email)}
            />
            <p className={classes.error}>{errors.email?.message}</p>

            <InputBase
              required
              type="password"
              placeholder="Password"
              error={!!errors.password?.message}
              fullWidth
              className={classes.field}
              {...register('password', scheme.password)}
            />

            <p className={classes.error}>
              {errors.password && errors.password.message}
            </p>

            <InputBase
              required
              type="password"
              placeholder="Repeat Password"
              error={!!errors.passwordRepeat?.message}
              fullWidth
              className={classes.field}
              {...register('passwordRepeat', {
                validate: () =>
                  getValues('password') === getValues('passwordRepeat') ||
                  'The passwords do not match',
              })}
            />
            <p className={classes.error}>
              {errors.passwordRepeat && errors.passwordRepeat.message}
            </p>

            <Button
              variant="contained"
              size="large"
              className={classes.btn}
              color="primary"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              Create profile
            </Button>

            {loginError && <p className={classes.error}> {message} </p>}
            <Link to="/" className={classes.link}>
              <Button variant="outlined" className={classes.backBtn}>
                Back
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Container>
  )
}
export default RegisterPage
