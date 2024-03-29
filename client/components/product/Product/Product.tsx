import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ICategoryProps, IProductProps } from '@interfaces/shop'
import Loader from '@ui/Loader'
import {
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { useStyles } from './Product.styles'
import {
  buy,
  countOfItem,
  formatPrice,
  inWishlist,
  toggleWishlist,
  updateCount,
} from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'
import { useSnackbar } from 'notistack'
import { Button, IconButton, Input, Link } from '@ui/index'
import CartMini from '@components/shop/components/CartMini'
import clsx from 'clsx'
import ProductCard from '@components/shop/components/ProductCard'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'

interface IProductComponent {
  product: IProductProps
}

const Product: FunctionComponent<IProductComponent> = ({ product }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  const { enqueueSnackbar } = useSnackbar()

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const xsWidth = useMediaQuery(theme.breakpoints.down('xs'))

  const [itemCount, setItemCount] = useState<number>(1)
  useEffect(() => setItemCount(1), [product])

  const changeCount = useCallback(
    (value: number) => {
      if (value > 0 && value <= product?.available) {
        setItemCount(value)
        return
      }
      if (value > product?.available) setItemCount(1)
    },
    [state.cart, dispatch, itemCount, product]
  )

  const { state: userState, dispatch: userDispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)

  if (!product) return <Loader />
  const {
    available,
    name,
    image,
    categories,
    price,
    rating,
    id,
    description,
  }: IProductProps = product

  const inList = inWishlist(state.wishlist, id)

  const toggleWish = async () =>
    await toggleWishlist(
      dispatch,
      id,
      state.wishlist,
      userDispatch,
      updateUser,
      userState.user
    )

  const toCart = async () => {
    const errStatus = await buy(
      dispatch,
      id,
      state.cart,
      available,
      enqueueSnackbar
    )
    if (itemCount > 1 && errStatus !== 2) {
      const currentCount = countOfItem(id, state.cart)
      await updateCount(dispatch, state.cart, id, currentCount + itemCount - 1)
    }
  }

  const related = state.products
    .filter((x) => {
      if (
        x.categories.some(
          (c) => categories.map((a) => a.name).indexOf(c.name) > -1
        ) &&
        x.id !== id
      ) {
        return x
      }
    })
    .slice(0, 4)

  return (
    <Grid
      container
      direction={isSmallWidth ? 'column' : 'row'}
      alignItems={isSmallWidth ? 'center' : 'flex-start'}
      justify={'space-between'}
      spacing={3}
      style={{ marginBottom: '3rem' }}
    >
      <Grid item xs={12} lg={9}>
        <Grid container spacing={1} direction={isSmallWidth ? 'column' : 'row'}>
          <Grid
            item
            xs={isSmallWidth ? 12 : 6}
            className={classes.imageContainer}
          >
            <img src={image.url} alt={name} className={classes.image} />
          </Grid>
          <Grid item xs={isSmallWidth ? 12 : 6}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item style={isSmallWidth ? { textAlign: 'center' } : {}}>
                <Typography variant={'caption'}>{name}</Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  precision={0.5}
                  className={classes.rating}
                  style={isSmallWidth ? { justifyContent: 'center' } : {}}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant={'h1'}
                  align={isSmallWidth ? 'center' : 'left'}
                >
                  {formatPrice(price)}
                </Typography>
                <Tooltip
                  title={
                    inList ? 'Удалить из избранного' : 'Добавить в избранное'
                  }
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
              <Grid item>
                <Typography
                  variant={'body2'}
                  align={isSmallWidth ? 'justify' : 'left'}
                >
                  {description}
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction={isSmallWidth ? 'column-reverse' : 'row'}
                  justify={'space-between'}
                  alignItems={'center'}
                  spacing={isSmallWidth ? 3 : 0}
                >
                  <Grid
                    item
                    style={
                      isSmallWidth ? { width: '100%', textAlign: 'center' } : {}
                    }
                  >
                    <Button
                      style={
                        xsWidth
                          ? { width: '67%' }
                          : isSmallWidth
                          ? { width: '50%' }
                          : {}
                      }
                      color={'primary'}
                      className={classes.buyButton}
                      onClick={toCart}
                      size={'large'}
                      variant={available < 1 ? 'text' : 'contained'}
                      disabled={available < 1}
                    >
                      {available > 0 ? `В корзину` : `Нет в наличии`}
                    </Button>
                  </Grid>
                  {available > 0 ? (
                    <Grid item>
                      <Grid container alignItems={'center'}>
                        <Grid item>
                          <IconButton
                            size={'medium'}
                            icon={'minus'}
                            disabled={itemCount <= 1}
                            onClick={() =>
                              itemCount > 1 && changeCount(+itemCount - 1)
                            }
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            type={'number'}
                            id={id + '_count'}
                            label={'Количество'}
                            value={itemCount}
                            onChange={(e) => {
                              changeCount(+e.currentTarget.value)
                            }}
                            className={classes.countInput}
                          />
                        </Grid>
                        <Grid item>
                          <IconButton
                            size={'medium'}
                            icon={'plus'}
                            disabled={itemCount === available}
                            onClick={() =>
                              itemCount < available &&
                              changeCount(+itemCount + 1)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Typography variant={'body2'}>
                      <b>Категории:</b>{' '}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'}>
                      {categories
                        ? categories.map(
                            (category: ICategoryProps, index: number) => (
                              <span key={index}>
                                {category.name}
                                {index !== categories.length - 1 && ', '}
                              </span>
                            )
                          )
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Typography variant={'body2'}>
                      <b>Поделиться:</b>{' '}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems={'center'} spacing={1}>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://www.facebook.com/sharer/sharer.php?display=popup&u=https://shop-products.vercel.app/products/${id}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'facebook'}
                            className={clsx(classes.button, classes.facebook)}
                          />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://pinterest.com/pin/create/button/?url=https://shop-products.vercel.app/products/${id}&media=${image.url}&description=${name}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'pinterest'}
                            className={clsx(classes.button, classes.pinterest)}
                          />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://twitter.com/intent/tweet?text=Покупайте+${name}+на+Food+Market+ &url=https://shop-products.vercel.app/products/${id}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'twitter'}
                            className={clsx(classes.button, classes.twitter)}
                          />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {related?.length > 0 ? (
            <Grid item xs={12} style={{ marginBottom: '3rem' }}>
              <Grid container direction={'column'} spacing={3}>
                <Grid
                  item
                  style={
                    isSmallWidth
                      ? { padding: '20px 0' }
                      : { padding: '20px 40px' }
                  }
                >
                  <Typography
                    variant={'h1'}
                    align={isSmallWidth ? 'center' : 'left'}
                  >
                    Связанные продукты
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={
                    isSmallWidth ? { paddingTop: 20 } : { paddingLeft: 20 }
                  }
                >
                  <Grid
                    container
                    direction={isSmallWidth ? 'column' : 'row'}
                    justify={'flex-start'}
                    alignItems={'center'}
                    spacing={3}
                  >
                    {related.map((p, index: number) => (
                      <Grid item key={`product_${p.id}`}>
                        <ProductCard hit={p} idx={index} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        style={
          isSmallWidth
            ? { padding: 0 }
            : { padding: '20px', maxWidth: 450, margin: '0 auto' }
        }
      >
        <CartMini />
      </Grid>
    </Grid>
  )
}

export default Product
