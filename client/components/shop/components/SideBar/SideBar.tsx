import React, { FunctionComponent } from 'react'
import { useStyles } from '@components/shop/Shop/Shop.styles'
import { Grid, useMediaQuery, useTheme } from '@material-ui/core'
import Menu from '@components/shop/components/Menu'
import PriceRange from '@components/shop/components/PriceRange'
import CartMini from '@components/shop/components/CartMini'

const SideBar: FunctionComponent = () => {
  const classes = useStyles()

  const theme = useTheme()
  const mdWidth = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid
      container
      className={classes.side}
      direction={'column'}
      spacing={3}
      style={
        mdWidth ? { maxWidth: 500, margin: '0 auto', padding: 0 } : {}
      }
    >
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
      <Grid
        item
        // style={
        //   isSmallWidth
        //     ? { padding: 0 }
        //     : {  }
        // }
      >
        <CartMini />
      </Grid>
    </Grid>
  )
}
export default SideBar
