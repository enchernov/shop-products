import React, { FunctionComponent, useContext } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'

import { useStyles } from './Order.styles'
import { IOrderProps } from '@interfaces/shop'
import { makeDate, makeOrderAgain } from '@utils/account'
import { formatPrice } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'
import { useSnackbar } from 'notistack'
import { Button } from '@ui/index'
import { AppContext } from '@providers/AppProvider'
import { changeAccountTab } from '@actions/auth'

interface IOrderComponentProps {
  order: IOrderProps
  idx?: number
}

const Order: FunctionComponent<IOrderComponentProps> = ({ order, idx = 0 }) => {
  const { total, createdAt, address, id } = order
  const products = JSON.parse(order.products) || []
  const date = makeDate(createdAt)
  const classes = useStyles()

  const { dispatch: appDispatch } = useContext(AppContext)

  const { state, dispatch } = useContext(ShopContext)
  const { enqueueSnackbar } = useSnackbar()

  const makeAgain = async () => {
    await makeOrderAgain(dispatch, order, state.products, enqueueSnackbar)
    await appDispatch(changeAccountTab(1))
  }

  return (
    <Paper
      className={classes.root}
      square={true}
      elevation={0}
      style={{ animationDelay: `${idx / 10}s` }}
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Typography
            variant={'h4'}
            align={'center'}
            style={{ fontWeight: 'bold' }}
          >
            {`#${id}`}
          </Typography>
        </Grid>
        {products.map((i) => (
          <Grid item key={i.id}>
            <Grid container justify={'space-between'} spacing={4}>
              <Grid item>
                <Typography variant={'h5'}>{i.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'}>{`${formatPrice(i.price)} × ${
                  i.count
                }`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'h4'}>Итог</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{`${(total / 100).toFixed(
                2
              )} ₽`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'h4'}>Адрес</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{address}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'h4'}>Дата</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{date}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            fullWidth={true}
            onClick={makeAgain}
            variant={'text'}
            className={classes.makeAgainButton}
          >
            Заказать снова
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Order
