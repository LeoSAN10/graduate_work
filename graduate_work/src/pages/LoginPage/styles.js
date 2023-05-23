import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: theme.typography.fontWeightBold,
  },
  field: {
    '&.Mui-error': {
      border: `2px solid ${theme.palette.error.main}`,
    },
    border: `2px solid  ${theme.palette.primary.main}`,
    background: theme.palette.secondary.main,
    height: 36,
    borderRadius: '10px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  loginBtn: {
    background: theme.palette.primary.main,
    borderRadius: 30,
    width: '250px',
    border: 0,
    color: 'white',
    height: 48,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 4px 13px -2px rgba(34, 60, 80, 0.11)',
  },
  googleBtn: {
    background: theme.palette.secondary.main,
    borderRadius: 30,
    width: '250px',
    border: `2px solid  ${theme.palette.primary.main}`,
    height: 48,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0px 4px 13px -2px rgba(34, 60, 80, 0.11)',
  },
  link: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
  },
  valid: {
    color: theme.palette.secondary.contrastText,
    marginTop: theme.spacing(1),
  },
  error: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.error.main,
  },
  resetPassword: {
    textDecoration: 'none',
    margin: theme.spacing(2),
    outline: 'none',
    color: theme.palette.text.primary,
    opacity: '0.5',
    transition: 'all .25s ease-in-out',
    '&:hover': {
      opacity: '1',
    },
  },
}))

export default useStyles
