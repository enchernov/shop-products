import React, { FunctionComponent, useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Carousel from '@components/main/Carousel'
import { useStyles } from './Main.styles'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'
import { ShopContext } from '@providers/ShopProvider'

const Main: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)
  const popular = state.products.sort((a, b) => b.rating - a.rating).slice(0, 5)
  return (
    <div className={classes.mainContainer}>
      <Grid container direction={'column'} spacing={6}>
        <Grid item xs={12}>
          <Carousel />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item className={classes.poster}>
              <Typography variant={'body1'}>POSTER 1</Typography>
            </Grid>
            <Grid item className={classes.poster}>
              <Typography variant={'body1'}>POSTER 2</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item style={{ padding: '20px 40px' }}>
                <Typography variant={'h1'}>Популярное сейчас</Typography>
              </Grid>
              <Grid item style={{ padding: '0 0 20px 0' }}>
                <Grid
                  container
                  justify={'space-around'}
                  alignItems={'center'}
                  spacing={3}
                >
                  {popular.map((p) => (
                    <Grid item key={`product_${p.id}`}>
                      <ProductCard hit={p} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item className={classes.banner} xs={3}>
              <Typography variant={'body1'}>BANNER 1</Typography>
            </Grid>
            <Grid item className={classes.banner} xs={3}>
              <Typography variant={'body1'}>BANNER 2</Typography>
            </Grid>
            <Grid item className={classes.banner} xs={3}>
              <Typography variant={'body1'}>BANNER 3</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Main
