import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button, Typography } from '@material-ui/core'

import useStyles from './styles'
import { StatusBage } from '../StatusBage'
import { Link, useLocation } from 'react-router-dom'
import { CategoryData } from '../Filters/CategoryFilter/CategoryFilter'
import getPicture from '../../utils/getPicture'
import MapIcon from '@mui/icons-material/Map'
import { getFormattedDate } from '../../utils/getFormattedDate'
import { ROUTES } from '../../utils/paths'
import { getFormattedTime } from '../../utils/getFormattedTime'



const MAP_BTN = 'View on the map'

const RequestItem = (props) => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const dateFrom = `From ${getFormattedTime(
    props.startDate
  )} ${getFormattedDate(props.startDate)}`
  const dateTo = `To ${getFormattedTime(props.endDate)} ${getFormattedDate(
    props.endDate
  )}`
  const picture = getPicture(props.picture)

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        {pathname === ROUTES.requestPage && (
          <StatusBage isActive={props.active} />
        )}
        <CardMedia component="img" className={classes.img} image={picture} />

        <Box>
          <CardContent>
            <Typography component="div" variant="h5">
              {props.name}
            </Typography>
            <Typography component="div" className={classes.category}>
              {CategoryData[props.categoryId]}
            </Typography>
            <Typography component="div" className={classes.content}>
              {props.description}
            </Typography>
            <Box className={classes.date}>
              <Typography component="div" className={classes.dateTime}>
                <Box>Period of Use:&nbsp;</Box>
                <Box>{dateFrom}&nbsp;</Box>
                <Box>{dateTo}</Box>
              </Typography>
            </Box>
          </CardContent>
          <CardActions className={classes.actionBlock}>
            <Box className={classes.moreDetails}>
              <Link
                to={`${ROUTES.requestPage}/${props.id}`}
                className={classes.link}
              >
                <Button variant="outlined" color="primary">
                  More Details
                </Button>
              </Link>
            </Box>
            {pathname === ROUTES.allRequests && (
              <Link
                to={ROUTES.requestOnTheMap(props.id)}
                className={classes.link}
              >
                <Button variant="outlined" color="primary">
                  {MAP_BTN}
                  <MapIcon />
                </Button>
              </Link>
            )}
          </CardActions>
        </Box>
      </Card>
    </Box>
  )
}

export default React.memo(RequestItem)
