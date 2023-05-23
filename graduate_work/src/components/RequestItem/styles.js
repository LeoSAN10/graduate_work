import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    '& .MuiCardMedia-img': {
      backgroundSize: 'contain',
      width: '250px',
      height: '200px',
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    position: 'relative',
    width: '70vw',
  },
  card: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  img: {
    margin: theme.spacing(2),
    height: 'auto',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      marginBottom: theme.spacing(5),
    },
  },
  content: {
    color: theme.palette.text.secondary,
    maxWidth: '40vw',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  category: {
    color: theme.palette.text.secondary,
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '5px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  active: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    position: 'absolute',
    borderRadius: '5px 0',
  },
  date: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  dateTime: {
    position: 'absolute',
    right: theme.spacing(5),
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.grey[500],
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      position: 'relative',
      right: '0',
      left: '0',
    },
  },
  actionBlock: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
    },
  },
  moreDetails: {
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}))

export default useStyles
