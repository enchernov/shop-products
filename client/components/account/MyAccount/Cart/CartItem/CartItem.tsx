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
  formatPrice,
} from '@utils/shop'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'

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
  const { state: userState, dispatch: userDispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)

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
    <Paper
      square={true}
      className={classes.root}
      elevation={0}
      style={isSmallWidth ? { paddingBottom: 40 } : {}}
    >
      <Grid container direction={'column'} alignItems={'center'}>
        <Grid item>
          <Link href={`/products/${id}`} className={classes.name}>
            <Typography variant={'h3'} align={'center'}>
              {name}
            </Typography>
          </Link>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Grid
            container
            justify={'space-between'}
            alignItems={'center'}
            direction={isSmallWidth ? 'column' : 'row'}
            spacing={isSmallWidth ? 1 : 0}
          >
            <Grid item>
              <img src={image.url} alt={name} className={classes.image} />
            </Grid>
            <Grid item style={{ position: 'relative' }}>
              <Grid container alignItems={'center'}>
                <Grid item>
                  <IconButton
                    size={'medium'}
                    icon={'minus'}
                    disabled={itemCount <= 1}
                    onClick={() => itemCount > 1 && changeCount(+itemCount - 1)}
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
              <Typography
                variant={'body1'}
                align={'center'}
                style={{ position: 'absolute', top: 75, width: '100%' }}
              >
                {`${formatPrice(price)} / шт.`}
              </Typography>
            </Grid>
            <Grid
              item
              style={isSmallWidth ? { margin: '1.25rem 0 0.5rem 0' } : {}}
            >
              <Typography variant={'h2'}>
                {count
                  ? formatPrice((price * count).toFixed(2))
                  : formatPrice(price)}
              </Typography>
            </Grid>
            {/*<Grid item style={isSmallWidth ? { marginTop: '1rem' } : {}}>*/}
            <Grid item>
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
                  style={isSmallWidth ? { bottom: 24, left: 48 } : { top: 24 }}
                />
              </Tooltip>
              <Tooltip title={'Удалить из корзины'} placement={'left'}>
                <IconButton
                  icon={'delete'}
                  color={'default'}
                  className={classes.icon}
                  onClick={remove}
                  style={isSmallWidth ? { right: 48 } : { bottom: 24 }}
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
