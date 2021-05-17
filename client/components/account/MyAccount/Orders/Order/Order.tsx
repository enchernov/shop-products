import React, { FunctionComponent } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'

import { useStyles } from './Order.styles'
import { IOrderProps } from '@interfaces/shop'
import { makeDate } from '@utils/account'
import { formatPrice } from '@utils/shop'

interface IOrderComponentProps {
  order: IOrderProps
  idx?: number
}

const Order: FunctionComponent<IOrderComponentProps> = ({ order, idx = 0 }) => {
  const { total, createdAt, address, id } = order
  const products = JSON.parse(order.products) || []
  const date = makeDate(createdAt)
  const classes = useStyles()
  return (
    <Paper
      className={classes.root}
      square={true}
      elevation={0}
      style={{ animationDelay: `${idx / 10}s` }}
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Grid
            container
            justify={'space-between'}
            alignItems={'center'}
            spacing={2}
          >
            <Grid item>
              <Typography variant={'h4'}>ID</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{id}</Typography>
            </Grid>
          </Grid>
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
      </Grid>
    </Paper>
  )
}

export default Order
