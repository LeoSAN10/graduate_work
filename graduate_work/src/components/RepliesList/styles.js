import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  cell: {
    maxWidth: '25vw',
    display: 'flex',
  },
  description: {
    maxWidth: '40vw',
    display: 'flex',
    wordBreak: 'break-all',
  },
  username: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
  },
  header: {
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(16),
    textAlign: 'center',
  },
  row: {
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.action.hover,
      '&:hover': {
        backgroundColor: theme.palette.grey[300],
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}))

export default useStyles
