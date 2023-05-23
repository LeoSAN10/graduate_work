import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    '& .Mui-error': {
      border: `2px solid ${theme.palette.error.main}`,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    fontSize: theme.typography.pxToRem(20),
    margin: theme.spacing(1),
  },

  registerBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '600px',
  },

  field: {
    border: `1px solid  ${theme.palette.grey[500]}`,
    background: theme.palette.secondary.main,
    height: '40px',
    borderRadius: '10px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },

  link: {
    textDecoration: 'none',
  },

  text: {
    textAlign: 'center',
  },

  btn: {
    borderRadius: '30px',
    textTransform: 'none',
    margin: theme.spacing(1),
    height: 48,
    width: '200px',
    color: theme.palette.primary.contrastText,
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
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.error.main,
  },
  btnGoogle: {
    width: '200px',
    height: '60px',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    borderRadius: '10px',
  },
}))
export default useStyles
