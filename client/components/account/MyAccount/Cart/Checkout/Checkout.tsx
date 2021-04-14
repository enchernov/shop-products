import React, { useState, FunctionComponent, useContext } from 'react'

import CardSection from './CardSection'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import { useStyles } from './Checkout.styles'
import { AppContext } from '@providers/AppProvider'
import { Autocomplete } from '@material-ui/lab'

interface ICheckoutProps {
  cart: any
  total: number
  resetFunction(): void
}

const Checkout: FunctionComponent<ICheckoutProps> = ({
  cart,
  total,
  resetFunction,
}) => {
  const [address, setAddress] = useState<string>('')
  const classes = useStyles()
  const { state } = useContext(AppContext)

  const handleChange = (e) => {
    const a = e.target?.value
    if (typeof a === 'number')
      setAddress(state?.user?.addresses[e.target?.value].address)
    else setAddress(e.target?.value)
  }

  return (
    <Paper square={true} className={classes.root}>
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
        justify={'space-around'}
        spacing={2}
      >
        <Grid item>
          <Typography variant={'h4'}>Информация о вас</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            options={state?.user?.addresses || []}
            getOptionLabel={(option: { address: string }) => option.address}
            className={classes.item}
            onInputChange={(e: any) => handleChange(e)}
            renderInput={(params) => (
              <TextField {...params} label="Адрес" variant="outlined" />
            )}
            freeSolo={true}
          />
        </Grid>
        <Grid item>
          <Typography variant={'h4'}>Содержимое заказа</Typography>
        </Grid>
        <Grid item>
          <Grid container direction={'column'} spacing={2}>
            {cart.map((i) => (
              <Grid item key={i.id}>
                <Grid
                  container
                  justify={'space-between'}
                  spacing={4}
                  className={classes.item}
                >
                  <Grid item>
                    <Typography variant={'body1'}>{i.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant={'body1'}
                    >{`${i.count} × ${i.price}₽`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <CardSection
            address={address}
            total={total}
            resetFunction={resetFunction}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Checkout
