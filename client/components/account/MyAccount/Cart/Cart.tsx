import React, { FunctionComponent, useContext, useMemo, useState } from 'react'

import { useStyles } from './Cart.styles'
import { ShopContext } from '@providers/ShopProvider'
import CartItem from '@components/account/MyAccount/Cart/CartItem'
import { clearCart, formCart, getTotal } from '@utils/shop'
import {
  Grid,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Button, IconButton, Link } from '@ui/index'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from './Checkout'
import { loadStripe } from '@stripe/stripe-js'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'

const Cart: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  // console.log(state)
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

  const lookMore =
    cart.length > 0
      ? Array.from(
          new Set(
            cart
              .map((item) =>
                state.products.filter((x) => {
                  if (
                    x.categories.some(
                      (c) =>
                        item &&
                        item.categories.map((a) => a.name).indexOf(c.name) > -1
                    ) &&
                    x.id !== item?.id &&
                    x.available > 0 &&
                    state.cart.map((l) => l.id).indexOf(x.id) === -1
                  ) {
                    return x
                  }
                })
              )
              .flat()
          )
        )
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
      : []

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const xsWidth = useMediaQuery(theme.breakpoints.down('xs'))

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
            <>
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
                        <>
                          <Grid item>
                            <Typography variant={'body2'} paragraph>
                              В корзине нет товаров. Посмотрите, что есть в{' '}
                              <Link href={'/shop'}>Магазине</Link>.
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
                              src="/images/account/cart.svg"
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
                  {cart.length && !checkout ? (
                    <Grid item>
                      <Paper
                        className={classes.placeOrderRoot}
                        square={true}
                        elevation={0}
                      >
                        <Typography
                          variant={'h1'}
                        >{`Итого ${total} ₽`}</Typography>
                        <Button
                          fullWidth={true}
                          size={'large'}
                          onClick={() => setCheckout(true)}
                          className={classes.button}
                        >
                          Заказать
                        </Button>
                      </Paper>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              {lookMore.length > 0 && (
                <Grid item xs={12} style={{ width: '100%' }}>
                  <Grid container direction={'column'} spacing={3}>
                    <Grid item style={{ padding: '20px' }}>
                      <Typography
                        variant={'h2'}
                        align={xsWidth ? 'center' : 'left'}
                      >
                        Вам могут понравиться эти товары
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={isSmallWidth ? {} : { padding: '0 0 20px 0' }}
                    >
                      <Grid
                        container
                        direction={xsWidth ? 'column' : 'row'}
                        justify={'flex-start'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        {lookMore.map((p) => (
                          <Grid item key={`product_${p.id}`}>
                            <ProductCard hit={p} />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
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
