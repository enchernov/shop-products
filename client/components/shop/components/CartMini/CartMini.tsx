import React, { useContext, useMemo } from 'react'
import { Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import { Button, IconButton, Link } from '@ui/index'
import { ShopContext } from '@providers/ShopProvider'
import { clearCart, filterCart, formCart, getTotal } from '@utils/shop'
import { useStyles } from './CartMini.styles'

const CartMini = () => {
  const { state, dispatch } = useContext(ShopContext)

  const classes = useStyles()

  const cart = formCart(state.cart, state.products).filter((x) => x)

  const total = useMemo(() => getTotal(cart), [cart])

  const remove = async (id) => await filterCart(dispatch, id, state.cart)

  const dropCart = async () => await clearCart(dispatch)

  return (
    <Grid container direction={'column'} spacing={3}>
      <Grid item>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Link href={'/my-account?panel=1'}>
              <Typography variant={'h3'} className={classes.link}>
                Корзина
              </Typography>
            </Link>
          </Grid>
          {cart.length ? (
            <Grid item>
              <Tooltip title={'Очистить корзину'} placement={'top'}>
                <IconButton icon={'clear'} onClick={dropCart} />
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {cart.length ? (
        <>
          {cart.map((product: any) => {
            const { name, image, price, id, count } = product
            return (
              <Grid item key={product?.id}>
                <Paper square={true} className={classes.root} elevation={0}>
                  <Grid
                    container
                    alignItems={'center'}
                    justify={'space-around'}
                    className={classes.productMini}
                  >
                    <Grid item>
                      <img
                        src={image.url}
                        alt={name}
                        className={classes.image}
                      />
                    </Grid>
                    <Grid item>
                      <Link href={`/products/${id}`}>
                        <Typography variant={'h6'} className={classes.link}>
                          {name}
                        </Typography>
                      </Link>
                      <Typography
                        variant={'subtitle1'}
                      >{`${price} ₽ × ${count}`}</Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title={'Удалить из корзины'} placement={'top'}>
                        <IconButton
                          icon={'delete'}
                          color={'default'}
                          className={classes.icon}
                          onClick={() => remove(id)}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          })}
          <Grid item>
            <Button
              fullWidth={true}
              size={'large'}
              href={'/my-account?panel=1'}
              className={classes.button}
              color={'secondary'}
            >
              {`Перейти в корзину (${total}₽)`}
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item>
          <Typography variant={'body2'}>Корзина пуста</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default CartMini
