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
          <Typography variant={'h1'}>Мой аккаунт</Typography>
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
                label={state.user?.username || <Skeleton width={100} />}
                {...a11yProps(0)}
              />
              <Tab label="Корзина" {...a11yProps(1)} />
              <Tab label="Заказы" {...a11yProps(2)} />
              <Tab label="Избранное" {...a11yProps(3)} />
              <Tab label="Адреса" {...a11yProps(4)} />
              <Tab label="Настройки" {...a11yProps(5)} />
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
