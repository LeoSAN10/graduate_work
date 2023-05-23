import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from 'react-loading-animation'
import { Container } from '@material-ui/core'
import Box from '@mui/material/Box'
import { useEffectOnce, useToggle } from 'react-use'
import { Button, Typography } from '@material-ui/core'

import useSelector from '../../hooks/useSelector'
import useActions from '../../hooks/useActions'
import Layout from '../../Components/Layout'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import useStyles from './styles'
import { CategoryData } from '../../Components/Filters/CategoryFilter/CategoryFilter'
import {
  getRequestById,
  getRequests,
} from '../../store/selectors/requestSelector'
import { getUserId, getUserName } from '../../store/selectors/userSelector'
import { getFormattedDate } from '../../utils/getFormattedDate'
import { RequestEditForm } from '../../Components/RequestEditForm/'
import getPicture from '../../utils/getPicture'
import { fetchRepliesByRequest } from '../../services/api/replies'
import RepliesList from '../../Components/RepliesList/RepliesList'

import { RepliesForm } from '../../Components/RepliesForm'
import { LocationData } from '../../Components/Filters/LocationFilter/LocationFilter'
import { ReportPopup } from '../../Components/ReportPopup'
import { RequestId } from '../../services/types'
import { getReplies } from '../../store/selectors/replySelector'

const ARCHIVE_BTN_LABEL = 'Archive'
const RESUME_BTN_LABEL = 'Resume'
const EDIT_BTN_LABEL = 'Edit'
const LEND_A_HAND_BTN_LABEL = 'Lend a hand'
const VIEW_RESPONSES_BTN_LABEL = 'View responses'

const RequestDetailsPage = () => {
  const classes = useStyles()
  const [editForm, setEditForm] = useToggle(false)
  const [replyForm, setReplyForm] = useToggle(false)
  const [archive, setArchive] = useToggle(true)
  const { requestId } = useParams<{ requestId}()
  const replies = useSelector(getReplies)
  const userName = useSelector(getUserName)
  const { loading, error } = useSelector(getRequests)
  const { fetchRequest, archiveUserRequest } = useActions()
  const userId = useSelector(getUserId)
  const request = useSelector(getRequestById(requestId))
  const [reply, setReply] = useState([])

  useEffectOnce(() => {
    fetchRequest(requestId)
    if (!request) {
      setArchive(true)
    } else {
      setArchive(request.active)
    }

    fetchRepliesByRequest(requestId).then((res) => {
      setReply(res.data)
    })
  })

  useEffect(() => {
    fetchRequest(requestId)
  }, [replies])

  const handleArchive = () => {
    archiveUserRequest(requestId)
    setArchive(!request.active)
  }

  return (
    <Container>
      {loading && <Loading />}
      {error && <Typography>{error}</Typography>}
      {request && (
        <Layout>
          <Box className={classes.main}>
            <Box className={classes.header}>
              <Typography component="div" className={classes.dateTime}>
                <AccessTimeIcon />
                {getFormattedDate(request.createdAt)}
              </Typography>
              {userId === request.userId && (
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.requestBtn}
                    onClick={setEditForm}
                  >
                    {EDIT_BTN_LABEL}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.requestBtn}
                    onClick={handleArchive}
                  >
                    {archive ? ARCHIVE_BTN_LABEL : RESUME_BTN_LABEL}
                  </Button>
                </Box>
              )}
            </Box>
            <img src={getPicture(request.picture)} className={classes.img} />
            <Typography component="h4" variant="h4">
              {request.name}
            </Typography>
            <Typography className={classes.content}>
              Created by: {userName}
            </Typography>
            <Typography className={classes.content}>
              Category: {CategoryData[request.categoryId]}
            </Typography>
            <Typography className={classes.content}>
              Location: {LocationData[request.locationId]}
            </Typography>
            <Typography>{request.description}</Typography>
            <Typography className={classes.content}>Period of use:</Typography>
            <Typography>
              {getFormattedDate(request.startDate)} -{' '}
              {getFormattedDate(request.endDate)}
            </Typography>
            <RepliesList replyList={reply} />

            <Box className={classes.bottomBtn}>
              {userId !== request.userId && (
                <Button
                  color="primary"
                  onClick={setReplyForm}
                  variant="outlined"
                  className={classes.replyBtn}
                  disabled={request.wasReplyCreated}
                >
                  {LEND_A_HAND_BTN_LABEL}
                </Button>
              )}
              {userId !== request.userId && (
                <ReportPopup requestId={request.id} />
              )}
            </Box>
          </Box>
          <RequestEditForm
            open={editForm}
            onClose={setEditForm}
            requestData={request}
            id={requestId}
          />
          <RepliesForm
            open={replyForm}
            onClose={setReplyForm}
            requestId={requestId}
          />
        </Layout>
      )}
    </Container>
  )
}

export default React.memo(RequestDetailsPage)
