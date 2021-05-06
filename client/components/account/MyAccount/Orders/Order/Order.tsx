import React, { FunctionComponent } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'

import { useStyles } from './Order.styles'
import { IOrderProps } from '@interfaces/shop'
import { makeDate } from '@utils/account'

interface IOrderComponentProps {
  order: IOrderProps
}

const Order: FunctionComponent<IOrderComponentProps> = ({ order }) => {
  const { total, createdAt, address, id } = order
  const products = JSON.parse(order.products) || []
  const date = makeDate(createdAt)
  const classes = useStyles()
  return (
    <Paper
      className={classes.root}
      square={true}
      elevation={0}
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}
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
                <Typography
                  variant={'h5'}
                >{`${i.count} × ${i.price} ₽`}</Typography>
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
