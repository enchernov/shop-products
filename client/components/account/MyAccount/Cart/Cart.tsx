import React, { FunctionComponent, useContext } from 'react'

// import { useStyles } from '@components/account/MyAccount/Cart/Cart.styles'
import { ShopContext } from '@providers/ShopProvider'
import { ICartItem, IProductProps } from '@interfaces/shop'
// import Item from '@components/account/MyAccount/Cart/Item'

const Cart: FunctionComponent = () => {
  // const classes = useStyles()
  const { state } = useContext(ShopContext)
  // const cart = useMemo(() => {
  const cart =
    // return
    Array.from(state.cart).map((cartItem: ICartItem) => {
      const candidate = Array.from(state.products).find(
        (product: IProductProps) => product.id === cartItem.id
      )
      console.log('candidate', candidate)
      return {
        ...candidate,
        count: cartItem.count,
      }
    })
  // }, [state.cart, state.products])
  console.log(cart, state.cart, state.products)
  return (
    <div>
      {/*{cart.map((product: IProductProps, index: number) => (*/}
      {/*  <Item {...product} key={index} />*/}
      {/*))}*/}
      {JSON.stringify(state.cart)}
    </div>
  )
}

export default Cart
