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
  filterBlock: {
    maxWidth: '1440px',
    width: '70vw',
    maxHeight: '320px',
    minHeight: '60px',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filter: {
    maxWidth: '280px',
  },
  resetBtn: {
    maxWidth: '300px',
    width: '60%',
    height: '50px',
    minWidth: '225px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export default useStyles
