import React, { FunctionComponent, useContext } from 'react'
import {
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { AppContext } from '@providers/AppProvider'
import Order from '@components/account/MyAccount/Orders/Order'
import { IconButton, Link } from '@ui/index'
import { useStyles } from './Orders.styles'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'
import { updUser } from '@utils/auth'

const Orders: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)
  const classes = useStyles()
  const clearOrders = async () => {
    await updUser(dispatch, updateUser, state?.user?.id, {
      orders: [],
    })
    return
  }
  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Grid container direction={'column'} spacing={2} alignItems={'center'}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h1'}>Заказы</Typography>
          </Grid>
          {state.user?.orders?.length ? (
            <Grid item>
              <Tooltip title={'Очистить историю заказов'} placement={'top'}>
                <IconButton
                  icon={'clear'}
                  className={classes.icon}
                  onClick={clearOrders}
                />
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          direction={isSmallWidth ? 'column' : 'row'}
          alignItems={isSmallWidth ? 'center' : 'flex-start'}
        >
          {state.user?.orders?.length ? (
            state.user.orders.map((o) => (
              <Grid item key={o.id}>
                <Order order={o} />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant={'body1'} paragraph>
                У вас пока нет заказов. Вы можете оформить заказ, если добавите
                в корзину продукты. Для этого воспользуйтесь{' '}
                <Link href={'/shop'}>Магазином</Link>.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Orders
