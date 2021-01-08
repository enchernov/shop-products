import React, { FunctionComponent, useContext, useState } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

import { IconButton, Link, Button } from '@ui/index'
import { IProductProps, ICategoryProps } from '@interfaces/shop'
import { addToCart, removeFromCart } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'

import { useStyles } from './ProductCard.styles'

const ProductCard: FunctionComponent<IProductProps> = ({
  name,
  image,
  categories,
  price,
  rating,
  id,
}) => {
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

  const rfc = async () => {
    try {
      // const data = await updateCart(dispatch, updateUser, id, state.user)
      const data = await removeFromCart(dispatch, id, state.cart)
      if (!data) return
    } catch (error) {
      console.log(error)
    }
  }

  const buy = async () => {
    try {
      // const data = await updateCart(dispatch, updateUser, id, state.user)
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
          <IconButton icon={'favorite'} className={classes.icon} />
        </Grid>
        <Grid item className={classes.iconAnimation}>
          <IconButton icon={'search'} className={classes.icon} />
        </Grid>
      </Grid>

      <Grid container direction={'column'} justify={'space-between'}>
        <Grid item>
          <img src={image.url} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          <Grid container direction={'column'} spacing={1}>
            <Grid item>
              <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={1}
              >
                {categories.map((category: ICategoryProps, index: number) => (
                  <Grid item className={classes.category} key={index}>
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
                <Typography variant={'h2'}>{name}</Typography>
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
                  <Typography variant={'h3'}>{price + ' ₽'}</Typography>
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
