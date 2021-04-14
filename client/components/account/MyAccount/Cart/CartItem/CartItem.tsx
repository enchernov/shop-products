import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react'
import { IProductProps } from '@interfaces/shop'
import {
  Grid,
  Paper,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { useStyles } from './CartItem.styles'
import { IconButton, Link, Input } from '@ui/index'
import { ShopContext } from '@providers/ShopProvider'
import {
  toggleWishlist,
  inWishlist,
  filterCart,
  updateCount,
} from '@utils/shop'

const CartItem: FunctionComponent<IProductProps> = ({
  name,
  image,
  price,
  id,
  count,
  available,
}: IProductProps) => {
  const classes = useStyles()

  const { state, dispatch } = useContext(ShopContext)

  const inList = inWishlist(state.wishlist, id)

  const toggleWish = async () =>
    await toggleWishlist(dispatch, id, state.wishlist)

  const remove = () => filterCart(dispatch, id, state.cart)

  const [itemCount, setItemCount] = useState<number>(count ? count : 1)

  const changeCount = useCallback(
    (value: number) => {
      if (value > 0 && value <= available) {
        setItemCount(value)
        if (value !== count) {
          updateCount(dispatch, state.cart, id, value)
        }
      }
    },
    [state.cart, dispatch, id, count, available]
  )

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Paper square={true} className={classes.root}>
      <Grid
        container
        justify={'space-between'}
        alignItems={'center'}
        direction={isSmallWidth ? 'column' : 'row'}
      >
        <Grid item>
          <img src={image.url} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          <Grid
            container
            direction={'column'}
            alignItems={'center'}
            spacing={4}
          >
            <Grid item>
              <Link href={`/products/${id}`} className={classes.name}>
                <Typography variant={'h3'}>{name}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Grid
                container
                direction={'column'}
                alignItems={'center'}
                justify={'space-between'}
                spacing={2}
              >
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
                          itemCount < available && changeCount(+itemCount + 1)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'}>
                    <b>{price}</b>&nbsp;₽&nbsp;/&nbsp;шт.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={isSmallWidth ? { marginTop: '1rem' } : {}}>
          <Typography variant={'h2'}>
            {count ? '' + (price * count).toFixed(2) : '' + price}&nbsp;₽
          </Typography>
        </Grid>
        <Grid item style={isSmallWidth ? { marginTop: '1rem' } : {}}>
          <Grid
            container
            direction={isSmallWidth ? 'row' : 'column'}
            justify={'space-between'}
            alignItems={'center'}
            spacing={10}
          >
            <Grid item>
              <Tooltip
                title={
                  inList ? 'Удалить из избранного' : 'Добавить в избранное'
                }
                placement={isSmallWidth ? 'top' : 'left'}
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
              <Tooltip
                title={'Удалить из корзины'}
                placement={isSmallWidth ? 'top' : 'left'}
              >
                <IconButton
                  icon={'delete'}
                  color={'default'}
                  className={classes.icon}
                  onClick={remove}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CartItem
