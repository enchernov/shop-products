import React, {
  FunctionComponent,
  useContext,
  useState,
  ChangeEvent,
} from 'react'
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { Breadcrumbs, Button, Divider, TabPanel } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Cart from './Cart'

import { useStyles } from './MyAccount.styles'
import { useMutation } from '@apollo/client'
import DELETE_USER from '@graphql/mutations/DeleteUser'
import { delUser, logoutUser } from '@utils/auth'
import Wishlist from '@components/account/MyAccount/Wishlist'

const MyAccount: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

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

  const handleDialog = () => setDialogOpen((prevState: boolean) => !prevState)

  const [deleteUser] = useMutation(DELETE_USER)

  const confirmDelete = async () => {
    try {
      handleDialog()
      const data = await delUser(dispatch, deleteUser, state?.user?.id)
      if (!data.user) {
        console.log('some problems')
      } else {
        await logoutUser(dispatch)
      }
    } catch (e) {
      console.log(e)
    }
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
          <Tab label="Корзина" {...a11yProps(1)} />
          <Tab label="Заказы" {...a11yProps(2)} />
          <Tab label="Избранное" {...a11yProps(3)} />
          <Tab label="Адреса" {...a11yProps(4)} />
          <Tab label="Настройки" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            direction={'column'}
            spacing={4}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant="h1">Корзина</Typography>
            </Grid>
            <Grid item>
              <Cart />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Заказы
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid
            container
            direction={'column'}
            spacing={4}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant="h1">Избранные товары</Typography>
            </Grid>
            <Grid item>
              <Wishlist />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          Адреса
        </TabPanel>
        <TabPanel value={value} index={5}>
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
            <Grid item>
              <Button
                color={'secondary'}
                variant={'outlined'}
                onClick={handleDialog}
              >
                Удалить аккаунт
              </Button>
              <Dialog
                open={dialogOpen}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Вы собираетесь удалить аккаунт {state.user?.username}?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    color={'textPrimary'}
                  >
                    Если вы не уверены в том, что хотите удалить аккаунт
                    <b>&nbsp;{state.user?.username}</b>, нажмите кнопку ОТМЕНА
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialog} color="default" autoFocus>
                    Отмена
                  </Button>
                  <Button
                    onClick={confirmDelete}
                    color="secondary"
                    variant={'outlined'}
                  >
                    Подвердить
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </>
  )
}

export default MyAccount
