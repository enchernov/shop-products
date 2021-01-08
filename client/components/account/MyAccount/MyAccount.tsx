import React, {
  FunctionComponent,
  useContext,
  useState,
  ChangeEvent,
} from 'react'
import { Typography, Grid, Tabs, Tab } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { Breadcrumbs, Divider, TabPanel } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import Dashboard from './Dashboard'
import Settings from './Settings'

import { useStyles } from './MyAccount.styles'

const MyAccount: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)

  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  const [value, setValue] = useState<number>(0)

  const handleChange = (_: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

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
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          className={classes.tabs}
        >
          <Tab
            label={state.user?.username || <Skeleton width={100} />}
            {...a11yProps(0)}
          />
          <Tab label="Заказы" {...a11yProps(1)} />
          <Tab label="Желания" {...a11yProps(2)} />
          <Tab label="Адреса" {...a11yProps(3)} />
          <Tab label="Настройки" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={1} direction={'column'}>
            <Grid item>
              <Typography variant={'h3'}>
                {state.user ? (
                  <>
                    Добро пожаловать,
                    {state.user?.username} | {state.user?.email}
                  </>
                ) : (
                  <Skeleton width={200} />
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Dashboard />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Заказы
        </TabPanel>
        <TabPanel value={value} index={2}>
          Желания
        </TabPanel>
        <TabPanel value={value} index={3}>
          Адреса
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Grid
            container
            direction={'column'}
            spacing={4}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant="h2">Настройки аккаунта</Typography>
            </Grid>
            <Grid item>
              <Settings />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </>
  )
}

export default MyAccount
