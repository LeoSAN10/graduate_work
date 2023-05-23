import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  to: string
  text: string
  className?: string
}

const LinkedButton = ({ to, text, className }: Props) => {
  const classes = useStyles()
  return (
    <Link to={to} className={classes.link}>
      <Button className={className}>{text}</Button>
    </Link>
  )
}

export default LinkedButton
