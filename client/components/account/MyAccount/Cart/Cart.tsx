import React, { FunctionComponent, useContext, useMemo, useState } from 'react'

import { useStyles } from './Cart.styles'
import { ShopContext } from '@providers/ShopProvider'
import CartItem from '@components/account/MyAccount/Cart/CartItem'
import { clearCart, formCart, getTotal } from '@utils/shop'
import { Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import { Button, IconButton, Link } from '@ui/index'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from './Checkout'
import { loadStripe } from '@stripe/stripe-js'

const Cart: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  const cart = formCart(state.cart, state.products).filter((x) => x)
  const dropCart = async () => await clearCart(dispatch)
  const total = useMemo(() => getTotal(cart), [cart])
  const [checkout, setCheckout] = useState<boolean>(false)
  const stripePromise = loadStripe(
    'pk_test_51IP3byC5oJQ1RKxs51wji8IIJ8cjCO85RfQ8vZuqejaevMv4FsW1DVbsDw38uJE1vmNOdW71U73EaSegC2bF4ON500UUuRpSTT'
  )

  const resetFunction = () => {
    dropCart()
    setCheckout(false)
  }

  return (
    <Grid
      container
      alignItems={'flex-start'}
      justify={'space-around'}
      spacing={2}
    >
      <Grid item xs={12}>
        <Grid container direction={'column'} spacing={2} alignItems={'center'}>
          <Grid item xs={12}>
            <Grid
              container
              justify={'center'}
              alignItems={'center'}
              spacing={3}
            >
              {checkout ? (
                <Grid item>
                  <Tooltip title={'Вернуться к корзине'} placement={'top'}>
                    <IconButton
                      icon={'back'}
                      onClick={() => setCheckout(false)}
                    />
                  </Tooltip>
                </Grid>
              ) : state.cart.length ? (
                <Grid item>
                  <Tooltip title={'Очистить корзину'} placement={'top'}>
                    <IconButton icon={'clear'} onClick={dropCart} />
                  </Tooltip>
                </Grid>
              ) : null}
              <Grid item>
                <Typography variant={'h1'}>
                  {checkout ? 'Оформить заказ' : 'Корзина'}
                </Typography>
              </Grid>
              {!checkout && cart.length ? (
                <Grid item>
                  <Tooltip title={'Оформить заказ'} placement={'top'}>
                    <IconButton
                      icon={'forward'}
                      onClick={() => setCheckout(true)}
                    />
                  </Tooltip>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          {!checkout && (
            <Grid item xs={12}>
              <Grid
                container
                justify={'space-around'}
                alignItems={'flex-start'}
                spacing={4}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'column'}
                    alignItems={'center'}
                    spacing={2}
                  >
                    {cart.length ? (
                      cart.map((product: any) => (
                        <Grid item key={product.id}>
                          <CartItem {...product} />
                        </Grid>
                      ))
                    ) : (
                      <Grid item>
                        <Typography variant={'body1'} paragraph>
                          В корзине нет товаров. Посмотрите, что есть в{' '}
                          <Link href={'/shop'}>Магазине</Link>.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {cart.length && !checkout ? (
                  <Grid item>
                    <Paper className={classes.placeOrderRoot} square={true}>
                      <Grid
                        container
                        direction={'column'}
                        alignItems={'center'}
                        justify={'space-between'}
                        spacing={2}
                      >
                        <Grid item>
                          <Grid
                            container
                            justify={'space-between'}
                            alignItems={'center'}
                            spacing={2}
                          >
                            <Grid item>
                              <Typography variant={'h1'}>Итого</Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant={'h1'}
                              >{`${total} ₽`}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            fullWidth={true}
                            size={'large'}
                            onClick={() => setCheckout(true)}
                            className={classes.button}
                          >
                            Заказать
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          )}
          {checkout && (
            <Grid item xs={12}>
              <Elements stripe={stripePromise}>
                <Checkout
                  cart={cart}
                  total={total}
                  resetFunction={resetFunction}
                />
              </Elements>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cart
