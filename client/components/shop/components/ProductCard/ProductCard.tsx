import React, { FunctionComponent, useContext } from 'react'
import { Paper, Typography, Grid, Tooltip, Chip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

import { IconButton, Link, Button } from '@ui/index'
import {
  IProductProps,
  ICategoryProps,
  IProductCardProps,
} from '@interfaces/shop'
import { buy, formatPrice, inWishlist, toggleWishlist } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'

import { useStyles } from './ProductCard.styles'
import clsx from 'clsx'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'

const ProductCard: FunctionComponent<IProductCardProps> = ({
  hit,
  idx = 0,
}: any) => {
  const {
    name,
    image,
    categories,
    price,
    rating,
    id,
    available,
  }: IProductProps = hit

  const imgUrl = image.formats.thumbnail.url
  const productLink = `/products/${id}`

  const classes = useStyles()

  const { state, dispatch } = useContext(ShopContext)

  const { state: userState, dispatch: userDispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)

  const { enqueueSnackbar } = useSnackbar()

  const toggleWish = async () =>
    await toggleWishlist(
      dispatch,
      id,
      state.wishlist,
      userDispatch,
      updateUser,
      userState.user
    )

  const inList = inWishlist(state.wishlist, id)

  const toCart = async () =>
    await buy(dispatch, id, state.cart, available, enqueueSnackbar)

  return (
    <Paper
      className={classes.root}
      style={{ animationDelay: `${idx / 10}s` }}
      square={true}
      aria-disabled={available < 1}
      elevation={0}
    >
      <Rating
        name="read-only"
        value={rating}
        readOnly
        precision={0.5}
        className={classes.rating}
      />
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
              aria-label={'like'}
              icon={inList ? 'favoriteFill' : 'favorite'}
              color={inList ? 'secondary' : 'default'}
              className={classes.icon}
              onClick={toggleWish}
            />
          </Tooltip>
        </Grid>
        <Grid item className={classes.iconAnimation}>
          <Tooltip title={'Подробнее'} placement={'left'}>
            <Link href={productLink} style={{ border: 'none' }}>
              <IconButton
                icon={'search'}
                className={classes.icon}
                aria-label={'search'}
              />
            </Link>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        justify={'flex-start'}
        alignItems={'center'}
        spacing={1}
        className={classes.categories}
      >
        {categories.map((category: ICategoryProps, index: number) => (
          <Grid item key={index} className={classes.chip}>
            <Chip label={category.name} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction={'column'}
        justify={'space-between'}
        spacing={4}
      >
        <Grid item xs={12} className={classes.imageContainer}>
          <img src={imgUrl} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <Link href={productLink} className={classes.name}>
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
                  <Typography variant={'h4'}>{formatPrice(price)}</Typography>
                </Grid>
                <Grid item>
                  {available > 0 ? (
                    <Button
                      variant={'text'}
                      className={clsx(
                        classes.cartButton,
                        classes.primaryButton
                      )}
                      color={'primary'}
                      icon={'cart'}
                      onClick={toCart}
                    >
                      В корзину
                    </Button>
                  ) : (
                    <Button
                      disabled={true}
                      variant={'text'}
                      className={classes.cartButton}
                    >
                      Нет в наличии
                    </Button>
                  )}
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
