import React, { FunctionComponent, useContext } from 'react'

// import { useStyles } from '@components/account/MyAccount/Cart/Cart.styles'
import { ShopContext } from '@providers/ShopProvider'
import CartItem from '@components/account/MyAccount/Cart/CartItem'
import { formCart } from '@utils/shop'
import { Grid } from '@material-ui/core'

const Cart: FunctionComponent = () => {
  // const classes = useStyles()
  const { state } = useContext(ShopContext)
  const cart = formCart(state.cart, state.products)
  return (
    <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      {state.cart.length ? (
        cart.map((product: any) => (
          <Grid item key={product.id}>
            <CartItem {...product} />
          </Grid>
        ))
      ) : (
        <p>Корзина пуста</p>
      )}
    </Grid>
  )
}

export default Cart
