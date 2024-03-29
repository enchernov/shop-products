import React, { FunctionComponent, useContext } from 'react'

import { ShopContext } from '@providers/ShopProvider'
import { formCart } from '@utils/shop'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import ProductCard from '@components/shop/components/ProductCard'
import { Link } from '@ui/index'

const Wishlist: FunctionComponent = () => {
  const { state } = useContext(ShopContext)
  const list = formCart(state.wishlist, state.products)

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid container direction={'column'} spacing={4} alignItems={'center'}>
      <Grid item>
        <Typography variant="h1">Избранные товары</Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          direction={!list.length ? 'column' : isSmallWidth ? 'column' : 'row'}
          alignItems={isSmallWidth ? 'center' : 'flex-start'}
        >
          {list.length && list.every((x) => x !== undefined) ? (
            list.map((product: any, index: number) => (
              <Grid item key={product.id}>
                <ProductCard hit={product} idx={index} />
              </Grid>
            ))
          ) : (
            <>
              <Grid item>
                <Typography variant={'body2'} paragraph align={'center'}>
                  В списке пока нет товаров. Мы уверены, что в{' '}
                  <Link href={'/shop'}>Магазине</Link> многе вам понравится.
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/images/account/favorite.svg"
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 450,
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Wishlist
