import React from 'react'
import { connectHits } from 'react-instantsearch-dom'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { IProductProps } from '@interfaces/shop'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'
import { useStyles } from '@components/shop/Shop/Shop.styles'

const ProductHits = connectHits(({ hits, getCount }) => {
  hits && getCount(hits.length)
  const classes = useStyles()
  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      justify={isSmallWidth ? 'center' : 'flex-start'}
      alignItems={'center'}
      spacing={3}
      className={classes.hits}
    >
      {hits.map((p: IProductProps, index: number) => (
        <Grid item key={`${p.name}_${index}`}>
          <ProductCard hit={p} />
        </Grid>
      ))}
      {!hits.length && <Typography>Результатов нет</Typography>}
    </Grid>
  )
})

export default ProductHits
