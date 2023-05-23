import React, { useContext, useEffect, useState } from 'react'

import Layout from '../../Components/Layout'
import { RequestList } from '../../Components/RequestList'
import {
  CategoryFilter,
  LocationFilter,
  ShowModeFilter,
  StatusFilter,
} from '../../Components/Filters'
import { Box, Button, Typography } from '@material-ui/core'
import useStyles from './styles'
import useSelector from '../../hooks/useSelector'
import Loading from 'react-loading-animation'
import { SET_REQUESTS_ERROR_MESSAGE } from '../../store/action-creators/errorMessages'
import { CategoryData } from '../../Components/Filters/CategoryFilter/CategoryFilter'
import { Request } from '../../store/types/request'
import { fetchFilteredRequests } from '../../services/api/requests'
import { LocationData } from '../../Components/Filters/LocationFilter/LocationFilter'
import { SearchContext } from '../../Contexts/SearchContext'
import { getMappedRequests } from '../../mapping/getMappedRequests'

import {
  MODE_DEFAULT_STATE,
  NO_ITEMS_FOUND_MESSAGE,
  RESET_FILTERS_BTN,
  STATUS_INACTIVE_STATE,
} from '../../utils/requestPagesConstants'

import { AppPagination } from '../../Components/AppPagination'
import { getRequests } from '../../store/selectors/requestSelector'
import { PAGE_LIMIT } from '../../utils/constans'
import { getPageCount } from '../../utils/getPageCount'

const RequestPage = () => {
  const classes = useStyles()
  const { requests, error, loading } = useSelector(getRequests)
  const { query, searchHandler } = useContext(SearchContext)
  const [filteredData, setFilteredData] = useState([])
  const [noItemsMessage, setNoItemsMessage] = useState('')

  const [locationId, setLocationId] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const [mode, setMode] = useState(MODE_DEFAULT_STATE)
  const [status, setStatus] = useState(true)
  const [reset, setReset] = useState(false)
  const [totalRequestsCount, setTotalRequestsCount] = useState(0)

  const [page, setPage] = useState(1)
  const pageCount = getPageCount(totalRequestsCount, PAGE_LIMIT)

  useEffect(() => {
    ;(async () => {
      setReset(false)
      const response = await fetchFilteredRequests(
        true,
        locationId,
        categoryId,
        mode,
        status,
        query,
        page - 1,
        PAGE_LIMIT
      )
      if (response.data.rows.length) {
        setNoItemsMessage('')
        setTotalRequestsCount(response.data.count)
        setFilteredData(getMappedRequests(response.data.rows))
      } else {
        setNoItemsMessage(NO_ITEMS_FOUND_MESSAGE)
        setFilteredData([])
      }
    })()
  }, [locationId, categoryId, mode, status, query, requests, reset, page])

  const handleCategory = (value) => {
    const result = value.map((item) => CategoryData[item])
    setCategoryId(result)
  }

  const handleLocation = (value) => {
    const result = value.map((item) => LocationData[item])
    setLocationId(result)
  }

  const handleStatus = (value) => {
    value === STATUS_INACTIVE_STATE ? setStatus(false) : setStatus(true)
  }

  const resetFiltersBlock = () => {
    setReset(true)
    searchHandler('')
  }

  return (
    <Layout
      filterBlock={
        <Box className={classes.filterBlock}>
          <CategoryFilter
            multiple
            reset={reset}
            onChange={handleCategory}
            className={classes.filter}
          />
          <LocationFilter
            multiple
            reset={reset}
            onChange={handleLocation}
            className={classes.filter}
          />
          <ShowModeFilter
            reset={reset}
            onChange={setMode}
            className={classes.filter}
          />
          <StatusFilter
            reset={reset}
            onChange={handleStatus}
            className={classes.filter}
          />
        </Box>
      }
      resetFiltersBtn={
        <Button
          className={classes.resetBtn}
          onClick={resetFiltersBlock}
          variant="contained"
        >
          {RESET_FILTERS_BTN}
        </Button>
      }
    >
      <Typography>{noItemsMessage}</Typography>
      {loading && <Loading />}
      {error === SET_REQUESTS_ERROR_MESSAGE && <Typography>{error}</Typography>}
      <Box className={classes.root}>
        <RequestList requestsList={filteredData} />
        {!noItemsMessage && (
          <AppPagination page={page} pageCount={pageCount} setPage={setPage} />
        )}
      </Box>
    </Layout>
  )
}

export default React.memo(RequestPage)
