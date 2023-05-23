import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(4),
  },
  requestBtn: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '100px',
  },
  responseBtn: {
    marginRight: theme.spacing(2),
  },
  replyBtn: {
    width: '150px',
    '&:disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      border: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  img: {
    margin: theme.spacing(2),
    display: 'block',
    objectFit: 'contain',
    maxWidth: '100%',
    width: '50%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  content: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  dateTime: {
    display: 'flex',
    alignItems: 'center',
  },
  bottomBtn: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default useStyles
