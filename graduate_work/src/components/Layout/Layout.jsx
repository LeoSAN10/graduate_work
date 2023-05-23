import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles'
import Searchbar from '../Searchbar'
import { MenuBar } from '../Menu/MenuBar'
import { RequestCreateForm } from '../RequestCreateForm'
import { AddRequestButton } from '../RequestForm/AddRequestButton'
import { useEffectOnce, useToggle } from 'react-use'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/paths'
import { PAGES_WITH_SEARCHBAR } from './PAGES_WITH_SEARCHBAR'
import { fetchUserThunk } from '../../store/reducers/userReducer'
import useActions from '../../hooks/useActions'


interface LayoutProps {
  children: React.ReactNode
  filterBlock?: React.ReactElement
  resetFiltersBtn?: React.ReactElement
}

const Layout = ({ children, filterBlock, resetFiltersBtn }: LayoutProps) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useToggle(false)
  const { pathname } = useLocation()
  const { fetchUserThunk } = useActions()

  useEffectOnce(() => {
    fetchUserThunk()
  })

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <MenuBar />
      </Grid>
      {PAGES_WITH_SEARCHBAR.includes(pathname) && (
        <Grid item xs={12}>
          <Searchbar />
        </Grid>
      )}
      <Grid item xs={12}>
        {filterBlock}
      </Grid>
      <Grid item xs={12}>
        {resetFiltersBtn}
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
      >
        {children}
      </Grid>
      <RequestCreateForm open={isOpen} onClose={setIsOpen} />
      <AddRequestButton onClick={setIsOpen} />
    </Grid>
  )
}

export default React.memo(Layout)
