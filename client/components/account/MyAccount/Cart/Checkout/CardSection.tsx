import React, { FunctionComponent, useContext, useState } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { formCart } from '@utils/shop'
import { useMutation } from '@apollo/client'
import CREATE_ORDER from '@graphql/mutations/CreateOrder'
import { ShopContext } from '@providers/ShopProvider'
import { AppContext } from '@providers/AppProvider'
import { Backdrop, CircularProgress, Grid, Typography } from '@material-ui/core'
import { Button } from '@ui/index'
import { useSnackbar } from 'notistack'

import { useStyles } from './Checkout.styles'
import { errorMessage } from '@hooks/auth/errorMessage'
import { useRouter } from 'next/router'
import { makeOrder } from '@utils/account'
import { StripeCardElement } from '@stripe/stripe-js'

interface ICardSectionProps {
  address: string
  total: number
  resetFunction(): void
}

const CardSection: FunctionComponent<ICardSectionProps> = ({
  address,
  total,
  resetFunction,
}) => {
  const router = useRouter()
  const [createOrder] = useMutation(CREATE_ORDER)
  const { enqueueSnackbar } = useSnackbar()

  const stripe = useStripe()
  const elements = useElements()

  const { state } = useContext(ShopContext)
  const { state: appState, dispatch } = useContext(AppContext)

  const classes = useStyles()

  const cart = formCart(state.cart, state.products).filter((x) => x)

  const [backdropOpen, setBackdropOpen] = useState<boolean>(false)

  const submitOrder = async () => {
    try {
      const cardElement = elements!.getElement(CardElement)
      const token = await stripe!.createToken(cardElement as StripeCardElement)
      if (!cart.length || !address.length || !token?.token?.id) {
        enqueueSnackbar('Заполните все поля', { variant: 'warning' })
      } else {
        setBackdropOpen(true)
        if (appState?.user?.id && token?.token?.id) {
          const data = await makeOrder(
            dispatch,
            createOrder,
            appState.user,
            cart,
            address,
            token
          )
          if (!data?.createOrder) {
            setBackdropOpen(false)
            throw new Error('Ошибка выполнения')
          } else {
            setBackdropOpen(false)
            router.push('/my-account?panel=2')
            enqueueSnackbar('Заказ размещён', { variant: 'success' })
            resetFunction()
          }
        }
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(errorMessage(error), { variant: 'error' })
    }
  }
  return (
    <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      <Grid item xs={12}>
        <Typography variant={'h4'}>Номер банковской карты</Typography>
      </Grid>
      <Grid item xs={12}>
        <CardElement className={classes.cardInput} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={submitOrder} size={'large'} className={classes.button}>
          {`Оплатить ${total}₽`}
        </Button>
      </Grid>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  )
}
export default CardSection
