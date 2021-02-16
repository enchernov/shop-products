import React, { FunctionComponent, useContext } from 'react'

import { useStyles } from './Wishlist.styles'
import { ShopContext } from '@providers/ShopProvider'
import { formCart } from '@utils/shop'
import { Grid } from '@material-ui/core'
import ProductCard from '@components/shop/components/ProductCard'

const Wishlist: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)
  const list = formCart(state.wishlist, state.products)
  console.log(list)
  return (
    <Grid container spacing={2}>
      {list.length ? (
        list.map((product: any) => (
          <Grid item key={product.id}>
            <ProductCard hit={product} />
          </Grid>
        ))
      ) : (
        <Grid item className={classes.empty}>
          <p>Товаров нет</p>
        </Grid>
      )}
    </Grid>
  )
}

export default Wishlist
