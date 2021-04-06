import React, { FunctionComponent } from 'react'
import { useStyles } from '@components/shop/Shop/Shop.styles'
import { Grid } from '@material-ui/core'
import Menu from '@components/shop/components/Menu'
import PriceRange from '@components/shop/components/PriceRange'
import CartMini from '@components/shop/components/CartMini'

const SideBar: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.side} direction={'column'} spacing={3}>
      <Grid item>
        <Menu attribute={'categories.name'} />
      </Grid>
      <Grid item>
        <PriceRange
          attribute={'price'}
          defaultRefinement={{
            min: 0,
            max: 9999,
          }}
          min={0}
          max={9999}
        />
      </Grid>
      <Grid item>
        <CartMini />
      </Grid>
    </Grid>
  )
}
export default SideBar
