import React, { FunctionComponent, useContext } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { formCart } from '@utils/shop'
import { useMutation } from '@apollo/client'
import CREATE_ORDER from '@graphql/mutations/CreateOrder'
import { ShopContext } from '@providers/ShopProvider'
import { AppContext } from '@providers/AppProvider'
import { Grid, Typography } from '@material-ui/core'
import { Button } from '@ui/index'
import { useSnackbar } from 'notistack'

import { useStyles } from './Checkout.styles'
import { errorMessage } from '@hooks/auth/errorMessage'
import { useRouter } from 'next/router'
import { makeOrder } from '@utils/account'

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
  const { state: appState } = useContext(AppContext)

  const classes = useStyles()

  const cart = formCart(state.cart, state.products).filter((x) => x)

  const submitOrder = async () => {
    try {
      const cardElement = elements.getElement(CardElement)
      const token = await stripe.createToken(cardElement)
      if (appState?.user?.id && token?.token.id) {
        const data = await makeOrder(
          createOrder,
          appState.user.id,
          cart,
          address,
          token
        )
        if (!data?.createOrder) {
          throw new Error('Ошибка выполнения')
        } else {
          enqueueSnackbar('Заказ размещён', { variant: 'success' })
          resetFunction()
          router.push('/my-account?panel=2')
        }
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(errorMessage(error), { variant: 'error' })
    }
  }
  return (
    <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      <Grid item>
        <Typography variant={'h4'}>Номер банковской карты</Typography>
      </Grid>
      <Grid item>
        <CardElement className={classes.cardInput} />
      </Grid>
      <Grid item>
        <Button onClick={submitOrder} size={'large'} className={classes.button}>
          {`Оплатить ${total}₽`}
        </Button>
      </Grid>
    </Grid>
  )
}
export default CardSection
