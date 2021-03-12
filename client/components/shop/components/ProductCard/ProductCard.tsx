import React, { FunctionComponent, useContext, useState } from 'react'
import { Paper, Typography, Grid, Tooltip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

import { IconButton, Link, Button } from '@ui/index'
import {
  IProductProps,
  ICategoryProps,
  IProductCardProps,
} from '@interfaces/shop'
import {
  addToCart,
  inWishlist,
  removeFromCart,
  toggleWishlist,
} from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'

import { useStyles } from './ProductCard.styles'

const ProductCard: FunctionComponent<IProductCardProps> = ({ hit }: any) => {
  const { name, image, categories, price, rating, id }: IProductProps = hit
  const classes = useStyles()

  const { state, dispatch } = useContext(ShopContext)

  const { enqueueSnackbar } = useSnackbar()

  const toggleWish = async () =>
    await toggleWishlist(dispatch, id, state.wishlist)

  const inList = inWishlist(state.wishlist, id)
  const inCart = inWishlist(state.cart, id)

  const rfc = async () => {
    try {
      const data = await removeFromCart(dispatch, id, state.cart)
      if (data)
        enqueueSnackbar('Товар больше не в корзине', { variant: 'info' })
      else enqueueSnackbar('Возникла ошибка', { variant: 'error' })
    } catch (error) {
      console.log(error)
    }
  }

  const buy = async () => {
    try {
      const data = await addToCart(dispatch, id, state.cart)
      if (data) enqueueSnackbar('Товар в корзине', { variant: 'success' })
      else enqueueSnackbar('Возникла ошибка', { variant: 'error' })
    } catch (error) {
      console.log(error)
    }
  }

  // return JSON.stringify(hit)

  return (
    <Paper className={classes.root} square={true}>
      <Grid
        container
        direction={'column'}
        spacing={1}
        className={classes.slideContainer}
      >
        <Grid item className={classes.iconAnimation}>
          <Tooltip
            title={inList ? 'Удалить из избранного' : 'Добавить в избранное'}
            placement={'left'}
          >
            <IconButton
              icon={inList ? 'favoriteFill' : 'favorite'}
              color={inList ? 'secondary' : 'default'}
              className={classes.icon}
              onClick={toggleWish}
            />
          </Tooltip>
        </Grid>
        <Grid item className={classes.iconAnimation}>
          <Tooltip title={'Подробнее'} placement={'left'}>
            <IconButton icon={'search'} className={classes.icon} />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        direction={'column'}
        justify={'space-between'}
        spacing={2}
      >
        <Grid item xs={12} className={classes.imageContainer}>
          <img src={image.url} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={1}
              >
                {categories.map((category: ICategoryProps, index: number) => (
                  <Grid item key={index}>
                    <Link
                      href={`/category/${category.link}`}
                      className={classes.link}
                    >
                      {category.name}
                    </Link>
                    {index !== categories.length - 1 && ','}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Link href={`/products/${id}`} className={classes.name}>
                <Typography variant={'h4'}>{name}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Grid
                container
                justify={'space-between'}
                alignItems={'center'}
                className={classes.actions}
              >
                <Grid item>
                  <Typography variant={'h4'}>{price + ' ₽'}</Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    precision={0.5}
                    className={classes.rating}
                  />
                  <Button
                    icon={inCart ? 'cartRemove' : 'cart'}
                    color={inCart ? 'secondary' : 'primary'}
                    variant={'text'}
                    className={classes.cartButton}
                    onClick={inCart ? rfc : buy}
                  >
                    {inCart ? 'Из корзины' : 'В корзину'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(ProductCard)
