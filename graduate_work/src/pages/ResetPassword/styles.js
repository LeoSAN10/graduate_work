import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    fontSize: theme.typography.pxToRem(20),
    padding: theme.spacing(2),
    textAlign: 'center',
  },

  field: {
    border: `2px solid  ${theme.palette.primary.main}`,
    background: theme.palette.secondary.main,
    height: '40px',
    width: '320px',
    borderRadius: '10px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },

  text: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },

  btn: {
    borderRadius: '30px',
    textTransform: 'none',
    margin: theme.spacing(1),
    height: 48,
    width: '200px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },

  backBtn: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '30px',
    textTransform: 'none',
    margin: theme.spacing(1),
    height: 48,
    width: '200px',
  },

  error: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.error.main,
  },
}))

export default useStyles
