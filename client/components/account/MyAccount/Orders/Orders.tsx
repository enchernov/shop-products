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
import { IOrderProps } from '@interfaces/shop'

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
  let orders = state?.user?.orders as Array<IOrderProps>
  orders =
    orders.length > 0
      ? Array.from(orders).sort(
          (a: IOrderProps, b: IOrderProps) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : []
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
          direction={
            !state.user?.orders?.length
              ? 'column'
              : isSmallWidth
              ? 'column'
              : 'row'
          }
          alignItems={isSmallWidth ? 'center' : 'flex-start'}
        >
          {orders.length ? (
            orders.map((o, index: number) => (
              <Grid item key={o.id}>
                <Order order={o} idx={index} />
              </Grid>
            ))
          ) : (
            <>
              <Grid item>
                <Typography variant={'body2'} paragraph align={'center'}>
                  У вас пока нет заказов. Вы сможете оформить заказ, если
                  добавите в корзину продукты. Для этого воспользуйтесь{' '}
                  <Link href={'/shop'}>Магазином</Link>.
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/images/account/order.svg"
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 450,
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Orders
