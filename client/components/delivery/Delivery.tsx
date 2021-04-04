import React, { FunctionComponent } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs, Divider } from '@ui/index'
import { useStyles } from './Delivery.styles'

const Delivery: FunctionComponent = () => {
  const classes = useStyles()
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
          <Typography variant={'h1'}>Условия доставки</Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} />
      <div className={classes.root}>
        <Grid
          container
          direction={'column'}
          spacing={3}
          justify={'space-around'}
        >
          <Grid item>
            <Typography variant={'body2'}>
              (1) The delivery times we specify start from the moment of our
              order confirmation provided that the purchase price has been paid
              (except for purchases by invoice). The delivery period is five
              days unless a different delivery time is specified in our online
              shop for the respective goods.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'body2'}>
              (2) If no items among the products that the Customer has chosen
              are available as of the moment the order is placed, the Provider
              shall immediately inform the Customer in the order confirmation.
              If the Customer is a consumer, the Provider clearly informs the
              Customer of whether there are any supply limitations by the latest
              at the start of the order process. If the product is not available
              in the long term, the Provider can cancel the acceptance notice.
              No contract is concluded in this case.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'body2'}>
              (3) If the product identified by the Customer in the order is only
              temporarily unavailable, the Provider also immediately informs the
              Customer in the order confirmation. In the event of a delivery
              delay of more than two weeks, the Customer is entitled to withdraw
              from the contract. The Provider is also entitled to terminate the
              contract in this case. If this happens, the Provider will
              immediately return to the Customer any payments made by the
              Customer.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Delivery
