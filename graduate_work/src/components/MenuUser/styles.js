import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
  logoMobileLink: {
    fontSize: theme.typography.pxToRem(20),
    textDecoration: 'none',
    color: theme.palette.common.black,
    borderBottom: `3px solid transparent`,
  },

  link: {
    fontSize: theme.typography.pxToRem(15),

    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    transition: '.3s',
  },
}))

export default useStyles
