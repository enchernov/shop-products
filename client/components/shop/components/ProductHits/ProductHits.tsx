import React, { useEffect } from 'react'
import { connectHits } from 'react-instantsearch-dom'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { IProductProps } from '@interfaces/shop'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'
import { useStyles } from '@components/shop/Shop/Shop.styles'

const ProductHits = connectHits(({ hits, getCount }) => {
  useEffect(() => {
    if (hits?.length) {
      getCount(hits.length)
    }
  }, [hits?.length, getCount])
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
      {!hits.length && (
        <Grid item>
          <Typography>Результатов нет</Typography>
        </Grid>
      )}
    </Grid>
  )
})

export default ProductHits
