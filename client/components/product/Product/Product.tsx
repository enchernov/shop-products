import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ICategoryProps, IProductProps } from '@interfaces/shop'
import Loader from '@ui/Loader'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { useStyles } from './Product.styles'
import { buy, countOfItem, updateCount } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'
import { useSnackbar } from 'notistack'
import { Button, IconButton, Input, Link } from '@ui/index'
import CartMini from '@components/shop/components/CartMini'
import clsx from 'clsx'
import ProductCard from '@components/shop/components/ProductCard'

interface IProductComponent {
  product: IProductProps
}

const Product: FunctionComponent<IProductComponent> = ({ product }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
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

  const toCart = async () => {
    await buy(dispatch, id, state.cart, available, enqueueSnackbar)
    if (itemCount > 1) {
      const currentCount = countOfItem(id, state.cart)
      await updateCount(dispatch, state.cart, id, currentCount + itemCount)
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
              <Grid item>
                <Typography variant={'caption'}>{name}</Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  precision={0.5}
                  className={classes.rating}
                />
              </Grid>
              <Grid item>
                <Typography variant={'h1'}>{price + ' ₽'}</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'body2'}>{description}</Typography>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Button
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
          <Grid item xs={12} style={{ marginBottom: '3rem' }}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item style={{ padding: '20px 40px' }}>
                <Typography variant={'h1'}>Связанные продукты</Typography>
              </Grid>
              <Grid item style={{ padding: '0 0 20px 0' }}>
                <Grid
                  container
                  justify={'space-around'}
                  alignItems={'center'}
                  spacing={3}
                >
                  {related.map((p) => (
                    <Grid item key={`product_${p.id}`}>
                      <ProductCard hit={p} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid
          container
          className={classes.side}
          direction={'column'}
          spacing={3}
        >
          <Grid item>
            <CartMini />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Product
