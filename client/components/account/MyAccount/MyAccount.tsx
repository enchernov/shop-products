import React, {
  FunctionComponent,
  useContext,
  useState,
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

const MyAccount: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)
  const router = useRouter()

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    const p = router.query?.panel
    if (p && +p >= 0 && +p <= 5) setValue(+p)
  }, [router.query?.panel])

  const handleChange = (_: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

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
          <Typography variant={'h1'} >
            Мой аккаунт
          </Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} />
      <div className={classes.root}>
        <Grid container direction={isSmallWidth ? 'column' : 'row'} spacing={3}>
          <Grid item xs={isSmallWidth ? 12 : 2}>
            <Tabs
              orientation={isSmallWidth ? 'horizontal' : 'vertical'}
              variant="scrollable"
              value={value}
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
                  value === 0 ? (
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
                  value === 1 ? (
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
                  value === 2 ? (
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
                  value === 3 ? (
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
                  value === 4 ? <Room color={'secondary'} /> : <RoomOutlined />
                }
                label="Адреса"
                {...a11yProps(4)}
              />
              <Tab
                className={classes.tab}
                icon={
                  value === 5 ? (
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
          <Grid item xs={isSmallWidth ? 12 : 10}>
            <TabPanel value={value} index={0}>
              <Dashboard />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Cart />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Orders />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Wishlist />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Addresses />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Settings />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default MyAccount
