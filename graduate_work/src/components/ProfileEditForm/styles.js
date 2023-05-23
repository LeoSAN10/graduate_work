import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  form: {
    width: theme.typography.pxToRem(500),
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: theme.typography.pxToRem(370),
    width: '100%',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  editProfileBtn: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0),
  },

  error: {
    fontSize: theme.typography.pxToRem(10),
    textAlign: 'center',
    color: theme.palette.error.main,
    padding: theme.spacing(0.5),
  },
  success: {
    fontSize: theme.typography.pxToRem(10),
    textAlign: 'center',
    color: theme.palette.success.main,
    padding: theme.spacing(0.5),
  },
  errorBlock: {
    minHeight: theme.typography.pxToRem(20),
  },
}))

export default useStyles
