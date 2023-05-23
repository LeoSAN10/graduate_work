import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  header: {
    fontSize: theme.typography.pxToRem(40),
    color: theme.palette.common.black,
    marginBottom: theme.spacing(7),
  },

  userInfoBlock: {
    display: 'flex',
    color: theme.palette.common.black,
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    marginBottom: theme.spacing(4),
  },

  accountData: {
    color: theme.palette.grey[500],
    fontSize: theme.typography.pxToRem(30),
  },

  userData: {
    fontSize: theme.typography.pxToRem(30),
  },

  editBtn: {
    width: '25%',
    borderRadius: theme.typography.pxToRem(17),
    fontSize: theme.typography.pxToRem(19),
  },

  accountDataBlock: {
    width: '70%',
  },
}))

export default useStyles
