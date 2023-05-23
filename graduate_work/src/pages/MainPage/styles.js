import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
  map: {
    marginTop: theme.spacing(8),
    width: '80vw',
    height: '75vh',
  },
}))

export default useStyles
