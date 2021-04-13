import React, { useContext } from 'react'
import { Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import { IconButton, Link } from '@ui/index'
import { ShopContext } from '@providers/ShopProvider'
import { clearCart, filterCart, formCart } from '@utils/shop'
import { useStyles } from './CartMini.styles'

const CartMini = () => {
  const { state, dispatch } = useContext(ShopContext)
  const classes = useStyles()

  const cart = formCart(state.cart, state.products)

  const remove = (id) => filterCart(dispatch, id, state.cart)

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
          {state.cart.length ? (
            <Grid item>
              <Tooltip title={'Очистить корзину'} placement={'top'}>
                <IconButton icon={'clear'} onClick={dropCart} />
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {cart.length && cart.every((x) => x !== undefined) ? (
        cart.map((product: any) => {
          const { name, image, price, id, count } = product
          return (
            <Grid item key={product?.id}>
              <Paper square={true} className={classes.root}>
                <Grid
                  container
                  alignItems={'center'}
                  className={classes.productMini}
                  spacing={1}
                >
                  <Grid item>
                    <img src={image.url} alt={name} className={classes.image} />
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
                  <Tooltip title={'Удалить из корзины'} placement={'top'}>
                    <IconButton
                      icon={'delete'}
                      color={'default'}
                      className={classes.icon}
                      onClick={() => remove(id)}
                    />
                  </Tooltip>
                </Grid>
              </Paper>
            </Grid>
          )
        })
      ) : (
        <Grid item>
          <Typography>Корзина пуста</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default CartMini
