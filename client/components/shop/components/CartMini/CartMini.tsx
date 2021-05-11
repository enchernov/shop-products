import React, { useContext, useMemo } from 'react'
import { Grid, Paper, Tooltip, Typography, Badge } from '@material-ui/core'
import { Button, IconButton, Link } from '@ui/index'
import { ShopContext } from '@providers/ShopProvider'
import {
  clearCart,
  filterCart,
  formatPrice,
  formCart,
  getTotal,
  inWishlist,
  toggleWishlist,
} from '@utils/shop'
import { useStyles } from './CartMini.styles'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'

const CartMini = () => {
  const { state, dispatch } = useContext(ShopContext)

  const { state: userState, dispatch: userDispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)

  const inList = (id = '') => inWishlist(state.wishlist, id)

  const toggleWish = async (id: string) =>
    await toggleWishlist(
      dispatch,
      id,
      state.wishlist,
      userDispatch,
      updateUser,
      userState.user
    )

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
            <Badge
              badgeContent={cart?.length}
              color="secondary"
              className={classes.badge}
            >
              <Link href={'/my-account?panel=1'}>
                <Typography variant={'h3'} className={classes.link}>
                  Корзина
                </Typography>
              </Link>
            </Badge>
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
                      <Typography variant={'subtitle1'}>{`${formatPrice(
                        price
                      )} × ${count}`}</Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip
                        title={
                          inList(product?.id)
                            ? 'Удалить из избранного'
                            : 'Добавить в избранное'
                        }
                        placement={'left'}
                      >
                        <IconButton
                          icon={
                            inList(product?.id) ? 'favoriteFill' : 'favorite'
                          }
                          color={inList(product?.id) ? 'secondary' : 'default'}
                          className={classes.icon}
                          onClick={() => toggleWish(product?.id)}
                        />
                      </Tooltip>
                      <Tooltip title={'Удалить из корзины'} placement={'left'}>
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
              {`Перейти в корзину (${formatPrice(total)})`}
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
