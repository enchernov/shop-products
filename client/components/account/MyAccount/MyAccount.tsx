import React, {
  FunctionComponent,
  useContext,
  ChangeEvent,
  useEffect,
} from 'react'
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import {
  AccountCircle,
  AccountCircleOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
  Favorite,
  FavoriteBorderOutlined,
  Settings as SettingsFilled,
  SettingsOutlined,
  Room,
  RoomOutlined,
  Assignment,
  AssignmentOutlined,
} from '@material-ui/icons'

import { Breadcrumbs, Divider, TabPanel } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Cart from './Cart'

import { useStyles } from './MyAccount.styles'
import Wishlist from '@components/account/MyAccount/Wishlist'
import Orders from '@components/account/MyAccount/Orders'
import Addresses from '@components/account/MyAccount/Addresses'
import { useRouter } from 'next/router'
import { changeAccountTab } from '@actions/auth'

const MyAccount: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const router = useRouter()

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  useEffect(() => {
    const p = router.query?.panel
    if (p && +p >= 0 && +p <= 5) dispatch(changeAccountTab(+p))
  }, [router.query?.panel])

  const handleChange = (_: ChangeEvent<unknown>, newValue: number) => {
    dispatch(changeAccountTab(newValue))
  }

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const mdWidth = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Grid
        container
        direction={'column'}
        justify={'flex-start'}
        className={classes.headline}
        spacing={1}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item>
          <Typography variant={'h1'}>Мой аккаунт</Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} />
      <div className={classes.root}>
        <Grid container direction={isSmallWidth ? 'column' : 'row'} spacing={3}>
          <Grid item xs={isSmallWidth ? 12 : mdWidth ? 3 : 2}>
            <Tabs
              orientation={isSmallWidth ? 'horizontal' : 'vertical'}
              variant="scrollable"
              value={state.accountTab}
              onChange={handleChange}
              aria-label="account tabs"
              style={
                isSmallWidth
                  ? { borderBottom: `1px solid ${theme.palette.divider}` }
                  : { borderRight: `1px solid ${theme.palette.divider}` }
              }
            >
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 0 ? (
                    <AccountCircle color={'secondary'} />
                  ) : (
                    <AccountCircleOutlined />
                  )
                }
                label={state.user?.username || <Skeleton width={100} />}
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 1 ? (
                    <ShoppingCart color={'secondary'} />
                  ) : (
                    <ShoppingCartOutlined />
                  )
                }
                label="Корзина"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 2 ? (
                    <Assignment color={'secondary'} />
                  ) : (
                    <AssignmentOutlined />
                  )
                }
                label="Заказы"
                {...a11yProps(2)}
              />
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 3 ? (
                    <Favorite color={'secondary'} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )
                }
                label="Избранное"
                {...a11yProps(3)}
              />
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 4 ? <Room color={'secondary'} /> : <RoomOutlined />
                }
                label="Адреса"
                {...a11yProps(4)}
              />
              <Tab
                className={classes.tab}
                icon={
                  state.accountTab === 5 ? (
                    <SettingsFilled color={'secondary'} />
                  ) : (
                    <SettingsOutlined />
                  )
                }
                label="Настройки"
                {...a11yProps(5)}
              />
            </Tabs>
          </Grid>
          <Grid item xs={isSmallWidth ? 12 : mdWidth ? 9 : 10}>
            <TabPanel value={state.accountTab} index={0}>
              <Dashboard />
            </TabPanel>
            <TabPanel value={state.accountTab} index={1}>
              <Cart />
            </TabPanel>
            <TabPanel value={state.accountTab} index={2}>
              <Orders />
            </TabPanel>
            <TabPanel value={state.accountTab} index={3}>
              <Wishlist />
            </TabPanel>
            <TabPanel value={state.accountTab} index={4}>
              <Addresses />
            </TabPanel>
            <TabPanel value={state.accountTab} index={5}>
              <Settings />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default MyAccount
