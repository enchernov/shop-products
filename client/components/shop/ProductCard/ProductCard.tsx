import React, { FunctionComponent, useContext, useMemo, useState } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

import { IconButton, Link, Button } from '@ui/index'
import { IProductProps, ICategoryProps } from '@interfaces/shop'
import { addToCart, removeFromCart, toggleWishlist } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'

import { useStyles } from './ProductCard.styles'

const ProductCard: FunctionComponent<IProductProps> = ({
  name,
  image,
  categories,
  price,
  rating,
  id,
}: IProductProps) => {
  const classes = useStyles()

  const { state, dispatch } = useContext(ShopContext)

  const { enqueueSnackbar } = useSnackbar()

  // const [updateUser] = useMutation(UPDATE_USER)
  // const [updateCart] = useMutation(UPDATE_CART)

  const [elevation, setElevation] = useState<number>(1)

  const handleMouseEnter = () => {
    setElevation(4)
  }
  const handleMouseLeave = () => {
    setElevation(1)
  }

  const toggleWish = async () =>
    await toggleWishlist(dispatch, id, state.wishlist)

  const inWishlist = useMemo(() => {
    return (
      Array.from(state.wishlist)
        .map((x) => x.id)
        .indexOf(id) !== -1
    )
  }, [state, id])

  const rfc = async () => {
    try {
      const data = await removeFromCart(dispatch, id, state.cart)
      if (!data) return
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

  return (
    <Paper
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      elevation={elevation}
      square={true}
      onDoubleClick={rfc}
    >
      <Grid
        container
        direction={'column'}
        spacing={1}
        className={classes.slideContainer}
      >
        <Grid item className={classes.iconAnimation}>
          <IconButton
            icon={inWishlist ? 'favoriteFill' : 'favorite'}
            color={inWishlist ? 'secondary' : 'default'}
            className={classes.icon}
            onClick={toggleWish}
          />
        </Grid>
        <Grid item className={classes.iconAnimation}>
          <IconButton icon={'search'} className={classes.icon} />
        </Grid>
      </Grid>
      <Grid container direction={'column'} justify={'space-between'}>
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
                    icon={'cart'}
                    color={'primary'}
                    variant={'text'}
                    className={classes.cartButton}
                    onClick={buy}
                  >
                    В корзину
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
