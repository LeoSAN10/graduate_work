import { Typography } from '@material-ui/core'
import { Avatar, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { memo } from 'react'
import { Reply } from '../../store/types/reply'
import { getTextAvatar } from '../../utils/textAvatar'
import { SocialMediaLinks } from '../SocialMediaLinks'
import useStyles from './styles'

interface ReplyListProps {
  replyList: Reply[]
}

const RepliesList = ({ replyList }: ReplyListProps) => {
  const classes = useStyles()

  const renderReplies = !!replyList ? (
    replyList.length ? (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.header}>Username</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.header}>Description</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.header}>Phone</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.header}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {replyList.map((reply: Reply) => (
            // eslint-disable-next-line react/jsx-key
            <TableRow className={classes.row} key={reply.id}>
              <TableCell>
                <Box className={classes.cell}>
                  <Avatar>{getTextAvatar(reply.User.name)}</Avatar>
                  <Box className={classes.username}>
                    <Typography className={classes.content}>
                      {reply.User.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell className={classes.description}>
                <Typography className={classes.description}>
                  {reply.text}
                </Typography>
              </TableCell>
              <TableCell>{reply.User.phone}</TableCell>
              <TableCell>
                <SocialMediaLinks reply={reply} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : null
  ) : null

  return <TableContainer>{renderReplies}</TableContainer>
}
export default memo(RepliesList)
